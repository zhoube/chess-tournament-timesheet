import { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { logColumns, playerColumns, STATUS } from '../constants';
import { sortedPlayers } from '../player/players';
import { Player } from '../player/types';
import { Log } from '../log/types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import { filter } from 'lodash';
import { convert_time } from '../functions';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function Home() {
	const navigate = useNavigate();
	const location = useLocation();

	const [allPlayers, setAllPlayers] = useState(
		location.state ? location.state.allPlayers : sortedPlayers
	);
	const [allActivePlayers, setAllActivePlayers] = useState(
		filter(allPlayers, (player: Player) => player.isPlaying)
	);
	const [allPlayersMap] = useState(
		location.state
			? location.state.allPlayersMap
			: new Map(sortedPlayers.map((player) => [player.id, player]))
	);
	const [allLogs, setAllLogs] = useState<Log[]>(
		location.state ? location.state.allLogs : []
	);
	const [currentLogId, setCurrentLogId] = useState(
		location.state ? location.state.currentLogId : 1
	);

	useEffect(
		() =>
			setAllActivePlayers(
				filter(allPlayers, (player: Player) => player.isPlaying)
			),
		[allPlayers]
	);

	const onAdminClick = () =>
		navigate('/admin', {
			state: {
				allPlayers: allPlayers,
				allPlayersMap: allPlayersMap,
				allLogs: allLogs,
				currentLogId: currentLogId,
			},
		});

	const createLog = (currentPlayer: Player) => {
		const now = new Date();
		if (currentPlayer.status == STATUS.IN) {
			const newLog: Log = {
				id: currentLogId,
				playerId: currentPlayer.id,
				displayedName: currentPlayer.title
					? currentPlayer.title + ' ' + currentPlayer.name
					: currentPlayer.name,
				timeOut: now,
				displayedTimeOut: now.toLocaleTimeString(),
				deleted: false,
			};
			setCurrentLogId(currentLogId + 1);
			setAllLogs((allLogs) => [...allLogs, newLog]);
		} else {
			const allLogsCopy = [...allLogs];
			const oldlog: Log = allLogsCopy[currentPlayer.currentLogId! - 1];
			const newLog: Log = {
				...oldlog,
				timeIn: now,
				displayedTimeIn: now.toLocaleTimeString(),
				timeTaken: now.getTime() - oldlog.timeOut.getTime(),
				displayedTimeTaken: convert_time(
					now.getTime() - oldlog.timeOut.getTime()
				),
			};
			allLogsCopy[currentPlayer.currentLogId! - 1] = newLog;
			setAllLogs(allLogsCopy);
		}
	};

	const handlePlayerStatusChange: GridEventListener<'cellClick'> = (
		params
	) => {
		if (params.field != 'status' && params.field != 'isPlaying') {
			return;
		}

		const allPlayersCopy = [...allPlayers];
		const currentPlayer: Player | undefined = allPlayersMap.get(
			params.row.id
		);

		if (!currentPlayer) {
			return;
		}

		if (params.field == 'status') {
			createLog(currentPlayer);
			if (currentPlayer.status == STATUS.IN) {
				currentPlayer.status = STATUS.OUT;
				currentPlayer.currentLogId = currentLogId;
				currentPlayer.exits += 1;
			} else {
				currentPlayer.status = STATUS.IN;
				currentPlayer.currentLogId = undefined;
			}
		}

		if (params.field == 'isPlaying') {
			const now = new Date();
			currentPlayer.isPlaying = false;
			currentPlayer.timeGameEnded = now;
			currentPlayer.displayedTimeGameEnded = now.toLocaleTimeString();
		}

		setAllPlayers(allPlayersCopy);
	};

	const handleLogCancellation: GridEventListener<'rowClick'> = (params) => {
		const allLogsCopy = [...allLogs];
		const oldLog: Log = allLogsCopy[params.row.id - 1];

		const allPlayersCopy = [...allPlayers];
		const currentPlayer: Player | undefined = allPlayersMap.get(
			oldLog.playerId
		);

		if (!currentPlayer) {
			return;
		}

		if (oldLog.deleted) {
			currentPlayer.exits++;
			if (!oldLog.timeIn) {
				currentPlayer.status = STATUS.OUT;
			}
		} else {
			currentPlayer.exits--;
			currentPlayer.status = STATUS.IN;
		}

		const newLog: Log = {
			...oldLog,
			deleted: !oldLog.deleted,
		};
		allLogsCopy[params.row.id - 1] = newLog;
		allPlayersCopy[oldLog.playerId] = currentPlayer;
		setAllLogs(allLogsCopy);
		setAllPlayers(allPlayers);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box margin={2}>
				<Stack
					direction="row"
					spacing={5}
					justifyContent="center">
					<Box
						component="img"
						src={logo}
						sx={{
							height: 100,
							width: 100,
						}}
					/>
					<Box>
						<Typography
							fontSize={30}
							textAlign={'center'}>
							74th Open and Women National Championships 2022 - Dr
							Wong Yip Chong Cup
						</Typography>
						<Stack
							direction="row"
							margin={3}
							spacing={10}
							justifyContent="center">
							<Typography
								fontSize={25}
								textAlign={'center'}>
								Round 4
							</Typography>
							<Button
								variant="contained"
								color="success"
								onClick={onAdminClick}>
								Admin
							</Button>
						</Stack>
					</Box>
					<Box
						component="img"
						src={logo}
						sx={{
							height: 100,
							width: 100,
						}}
					/>
				</Stack>

				<Stack
					direction="row"
					spacing={10}
					justifyContent="space-evenly">
					<Box
						sx={{
							height: 500,
							width: '45%',
							'& .deleted': {
								backgroundColor: '#7D221D',
							},
						}}>
						<Typography
							fontSize={20}
							margin={'2%'}
							textAlign={'center'}>
							Time Sheet
						</Typography>
						<DataGrid
							rows={allLogs}
							columns={logColumns}
							pageSize={100}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							onRowDoubleClick={handleLogCancellation}
							hideFooter
							getCellClassName={(params) => {
								if (params.row.deleted) {
									return 'deleted';
								} else {
									return '';
								}
							}}
						/>
					</Box>
					<Box
						sx={{
							height: 500,
							width: '45%',
							'& .signOut': {
								backgroundColor: '#082759',
							},
							'& .signIn': {
								backgroundColor: '#EE4B2B',
							},
							'& .gameEnded': {
								backgroundColor: '#5B2C6F',
							},
						}}>
						<Typography
							fontSize={20}
							margin={'2%'}
							textAlign={'center'}>
							Players
						</Typography>
						<DataGrid
							rows={allActivePlayers}
							columns={playerColumns}
							pageSize={50}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							onCellClick={handlePlayerStatusChange}
							hideFooter
							getCellClassName={(params) => {
								if (params.field == 'status') {
									return params.value == STATUS.IN
										? 'signOut'
										: 'signIn';
								} else if (params.field == 'isPlaying') {
									return 'gameEnded';
								} else {
									return '';
								}
							}}
						/>
					</Box>
				</Stack>
			</Box>
		</ThemeProvider>
	);
}

export default Home;
