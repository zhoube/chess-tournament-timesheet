import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { logColumns, playerColumns, STATUS } from './constants';
import { players } from './player/players';
import { Player } from './player/types';
import { Log } from './log/types';

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
		console.log(allLogs);
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
		<Box padding={'2%'}>
			<Typography fontSize={50} textAlign={'center'}>
				National Championships
			</Typography>
			<Typography fontSize={30} textAlign={'center'}>
				Round 2
			</Typography>
			<Stack direction='row' spacing={10} justifyContent='space-evenly'>
				<Box sx={{ height: 400, width: '45%' }}>
					<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
						Time Sheet
					</Typography>
					<DataGrid
						rows={allLogs}
						columns={logColumns}
						pageSize={20}
						rowsPerPageOptions={[20, 50, 100]}
						checkboxSelection={false}
						experimentalFeatures={{ newEditingApi: true }}
					/>
				</Box>
				<Box sx={{ height: 400, width: '45%' }}>
					<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
						All Players
					</Typography>
					<DataGrid
						rows={allPlayers}
						columns={playerColumns}
						pageSize={20}
						rowsPerPageOptions={[20, 50, 100]}
						checkboxSelection={false}
						experimentalFeatures={{ newEditingApi: true }}
						onCellClick={handleStatusChange}
					/>
				</Box>
			</Stack>

		</Box>
	);
}

export default App;
