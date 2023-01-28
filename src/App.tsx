import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridEventListener } from '@mui/x-data-grid';
import { logColumns, playerColumns, STATUS } from './constants';
import { players } from './player/players';
import { Player } from './player/types';
import { Log } from './log/types';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
	const [allPlayers, setAllPlayers] = useState(players);
	const [allLogs, setAllLogs] = useState<Log[]>([]);
	const [currentLogId, setCurrentLogId] = useState(1);

	useEffect(() => {
		setAllLogs(allLogs);
	})

	const handleStatusChange: GridEventListener<'cellClick'> = (params: { row: { id: number; }; }) => {
		const currentPlayer: Player = allPlayers[params.row.id - 1];
		createLog(currentPlayer);
		if (currentPlayer.status == STATUS.IN) {
			currentPlayer.status = STATUS.OUT;
			currentPlayer.currentLogId = currentLogId;
		} else {
			currentPlayer.status = STATUS.IN;
			currentPlayer.currentLogId = undefined;
		}
		setAllPlayers(allPlayers);
	};

	const createLog = (currentPlayer: Player) => {
		const now = new Date();
		if (currentPlayer.status == STATUS.IN) {
			const newLog: Log = {
				id: currentLogId,
				name: currentPlayer.name,
				time_out: now.toLocaleTimeString(),
				deleted: false
			}
			setCurrentLogId(currentLogId + 1);
			setAllLogs(allLogs => [...allLogs, newLog]);
		} else {
			const allLogsCopy = [...allLogs]
			const oldlog: Log = allLogsCopy[currentPlayer.currentLogId! - 1];
			const newLog: Log = {...oldlog, time_in: now.toLocaleTimeString()}
			allLogsCopy[currentPlayer.currentLogId! - 1] = newLog;
			setAllLogs(allLogsCopy);
		}
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box padding={'2%'}>
				<Typography fontSize={50} textAlign={'center'}>
					National Championships
				</Typography>
				<Typography fontSize={30} textAlign={'center'}>
					Round 2
				</Typography>
				<Stack direction='row' spacing={10} justifyContent='space-evenly'>
					<Box sx={{ height: 500, width: '45%' }}>
						<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
							Time Sheet
						</Typography>
						<DataGrid
							rows={allLogs}
							columns={logColumns}
							pageSize={50}
							rowsPerPageOptions={[20, 50, 100]}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
						/>
					</Box>
					<Box 
						sx={{
							height: 500,
							width: '45%',
							'& .cold': {
								backgroundColor: '#0096FF'
							},
							'& .hot': {
								backgroundColor: '#EE4B2B'
							}
						}}>
						<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
							All Players
						</Typography>
						<DataGrid
							rows={allPlayers}
							columns={playerColumns}
							pageSize={50}
							rowsPerPageOptions={[20, 50, 100]}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							onCellClick={handleStatusChange}
							getCellClassName={(params: GridCellParams<string>) => {
								if (params.field === 'status') {
									// // console.log(params);
									// if (params.value == STATUS.IN) {
									// 	console.log("IN PLZ");
									// }
									return params.value == STATUS.IN
										? 'cold'
										: 'hot';
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

export default App;
