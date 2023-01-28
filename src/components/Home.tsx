import { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { logColumns, playerColumns, STATUS } from '../constants';
import { sortedPlayers } from '../player/players';
import { Player } from '../player/types';
import { Log } from '../log/types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useLocation, useNavigate} from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Home() {
	const navigate = useNavigate();
	const location = useLocation();

	const [allPlayers, setAllPlayers] = useState(location.state ? location.state.allPlayers : sortedPlayers);
	const [allPlayersMap] = useState(location.state ? location.state.allPlayersMap : new Map(sortedPlayers.map(player => [player.id, player])));
	const [allLogs, setAllLogs] = useState<Log[]>(location.state ? location.state.allLogs : []);
	const [currentLogId, setCurrentLogId] = useState(location.state ? location.state.currentLogId : 1);

	const handleStatusChange: GridEventListener<'cellClick'> = (params) => {
		if (params.field != 'status') {
			return ;
		}
		const allPlayersCopy = [...allPlayers];
		const currentPlayer: Player | undefined = allPlayersMap.get(params.row.id);

		if (!currentPlayer) {
			return ;
		}

		createLog(currentPlayer);
		if (currentPlayer.status == STATUS.IN) {
			currentPlayer.status = STATUS.OUT;
			currentPlayer.currentLogId = currentLogId;
			currentPlayer.exits += 1
		} else {
			currentPlayer.status = STATUS.IN;
			currentPlayer.currentLogId = undefined;
		}
		setAllPlayers(allPlayersCopy);
	};

	const convert_time = (milliseconds: number) => {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		return minutes.toString() + " mins" + (seconds - minutes * 60).toString() + " secs";      
	}

	const createLog = (currentPlayer: Player) => {
		const now = new Date();
		if (currentPlayer.status == STATUS.IN) {
			console.log(allLogs);
			const newLog: Log = {
				id: currentLogId,
				playerId: currentPlayer.id,
				name: currentPlayer.name,
				timeOut: now,
				displayedTimeOut: now.toLocaleTimeString(),
				deleted: false
			}
			setCurrentLogId(currentLogId + 1);
			setAllLogs(allLogs => [...allLogs, newLog]);
		} else {
			const allLogsCopy = [...allLogs]
			const oldlog: Log = allLogsCopy[currentPlayer.currentLogId! - 1];
			const newLog: Log = {
				...oldlog,
				timeIn: now,
				displayedTimeIn: now.toLocaleTimeString(),
				timeTaken: now.getTime() - oldlog.timeOut.getTime(),
				displayedTimeTaken: convert_time(now.getTime() - oldlog.timeOut.getTime())
			}
			allLogsCopy[currentPlayer.currentLogId! - 1] = newLog;
			setAllLogs(allLogsCopy);
		}
	}

	const onAdminClick = (() => navigate('/admin', { 
		state: { 
			allPlayers: allPlayers,
			allPlayersMap: allPlayersMap,
			allLogs: allLogs, 
			currentLogId: currentLogId
		} 
	}));

	const handleLogCancellation: GridEventListener<'rowClick'> = (params) => {
		const allLogsCopy = [...allLogs];
		const oldLog: Log = allLogsCopy[params.row.id - 1];

		const allPlayersCopy = [...allPlayers];
		const currentPlayer: Player | undefined = allPlayersMap.get(oldLog.playerId);

		if (!currentPlayer) {
			return ;
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
			deleted: !oldLog.deleted
		}
		allLogsCopy[params.row.id - 1] = newLog;
		allPlayersCopy[oldLog.playerId] = currentPlayer;
		setAllLogs(allLogsCopy);
		setAllPlayers(allPlayers);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box padding={'2%'} margin={2}>
				<Typography fontSize={30} textAlign={'center'}>
					74th Open and Women National Championships 2023 - Dr Wong Yip Chong Cup
				</Typography>
				<Stack direction='row' spacing={10} justifyContent='center'>
					<Typography fontSize={25} textAlign={'center'}>
						Round 3
					</Typography>
					<Button variant="contained" color='success' onClick={onAdminClick}>
						Admin
					</Button>
				</Stack>
				<Stack direction='row' spacing={10} justifyContent='space-evenly'>
					<Box
						sx={{
							height: 500,
							width: '45%',
							'& .deleted': {
								backgroundColor: '#7D221D'
							}
						}}>
						<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
							Time Sheet
						</Typography>
						<DataGrid
							rows={allLogs}
							columns={logColumns}
							pageSize={100}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							onRowDoubleClick={handleLogCancellation}
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
								backgroundColor: '#082759'
							},
							'& .signIn': {
								backgroundColor: '#0E4732'
							}
						}}>
						<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
							All Players
						</Typography>
						<DataGrid
							rows={allPlayers}
							columns={playerColumns}
							pageSize={50}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							onCellClick={handleStatusChange}
							getCellClassName={(params) => {
								if (params.field === 'status') {
									return params.value == STATUS.IN
										? 'signOut'
										: 'signIn';
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
