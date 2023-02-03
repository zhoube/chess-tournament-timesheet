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
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminLogColumns, adminPlayerColumns, STATUS } from '../constants';
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
							height: 50,
							width: 50,
						}}
					/>
					<Typography
						fontSize={30}
						textAlign={'center'}>
						74th Open and Women National Championships 2023 - Dr
						Wong Yip Chong Cup
					</Typography>
				</Stack>
				<Stack
					direction="row"
					spacing={10}
					justifyContent="center"
					margin={2}>
					<Button
						variant="contained"
						color="success"
						onClick={onHomeClick}>
						Home
					</Button>
					<Typography
						fontSize={25}
						textAlign={'center'}>
						Round 3
					</Typography>
					<Button
						variant="contained"
						color="error"
						onClick={onClearClick}>
						Clear
					</Button>
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
			</Box>
		</ThemeProvider>
	);
}

export default Admin;
