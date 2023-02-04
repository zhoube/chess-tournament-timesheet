import {
	Box,
	Button,
	createTheme,
	CssBaseline,
	Stack,
	ThemeProvider,
	Typography,
} from '@mui/material';
import { DataGrid, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	adminLogColumns,
	adminPlayerColumns,
	ROUND_NUMBER,
	STATUS,
} from '../constants';
import { Log } from '../log/types';
import { sortedPlayers } from '../player/players';
import { Player } from '../player/types';
import logo from '../logo.jpg';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function Admin() {
	const navigate = useNavigate();
	const location = useLocation();

	const [allPlayers, setAllPlayers] = useState(location.state.allPlayers);
	const [allPlayersMap, setAllPlayersMap] = useState(
		location.state.allPlayersMap
	);
	const [allLogs, setAllLogs] = useState<Log[]>(location.state.allLogs);
	const [currentLogId, setCurrentLogId] = useState(
		location.state.currentLogId
	);
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const onHomeClick = () =>
		navigate('/', {
			state: {
				allPlayers: allPlayers,
				allPlayersMap: allPlayersMap,
				allLogs: allLogs,
				currentLogId: currentLogId,
			},
		});

	const onClearClick = () => {
		setAllPlayers(sortedPlayers);
		setAllPlayersMap(
			new Map(sortedPlayers.map((player) => [player.id, player]))
		);
		setAllLogs([]);
		setCurrentLogId(1);
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

		if (params.field == 'isPlaying') {
			const now = new Date();
			currentPlayer.isPlaying = false;
			currentPlayer.timeGameEnded = now;
			currentPlayer.displayedTimeGameEnded = now.toLocaleTimeString();
		}

		setAllPlayers(allPlayersCopy);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box margin={5}>
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
							<Button
								variant="contained"
								color="success"
								onClick={onHomeClick}>
								Home
							</Button>
							<Typography
								fontSize={25}
								textAlign={'center'}>
								Round {ROUND_NUMBER}
							</Typography>
							<Button
								variant="contained"
								color="error"
								onClick={onClearClick}>
								Clear
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
					spacing={5}
					justifyContent="center">
					<Box sx={{ height: 500, width: '45%' }}>
						<Typography
							fontSize={20}
							margin={'2%'}
							textAlign={'center'}>
							Time Sheet - Admin
						</Typography>
						<DataGrid
							rows={allLogs}
							columns={adminLogColumns}
							pageSize={100}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							components={{ Toolbar: GridToolbar }}
							hideFooter
						/>
					</Box>
					<Box
						sx={{
							height: 500,
							width: '45%',
							'& .gameEnded': {
								backgroundColor: '#5B2C6F',
							},
							'& .resumeGame': {
								backgroundColor: '#117A65',
							},
						}}>
						<Typography
							fontSize={20}
							margin={'2%'}
							textAlign={'center'}>
							Players - Admin
						</Typography>
						<DataGrid
							rows={allPlayers}
							columns={adminPlayerColumns}
							pageSize={50}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							components={{ Toolbar: GridToolbar }}
							onCellClick={handlePlayerStatusChange}
							hideFooter
							getCellClassName={(params) => {
								if (params.field == 'isPlaying') {
									if (params.value) {
										return 'gameEnded';
									} else {
										return 'resumeGame';
									}
								} else {
									return '';
								}
							}}
						/>
					</Box>
				</Stack>
				<Box margin={10}>
					<Typography
						align="center"
						fontSize={48}>
						{currentDateTime.toDateString()}
						<br></br>
						{currentDateTime.toLocaleTimeString()}
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default Admin;
