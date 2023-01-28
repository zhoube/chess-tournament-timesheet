import { Box, Button, createTheme, CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogColumns, adminPlayerColumns } from "../constants";
import { Log } from "../log/types";
import { sortedPlayers } from "../player/players";

const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
});

function Admin() {
	const navigate = useNavigate();
	const location = useLocation();

	const [allPlayers, setAllPlayers] = useState(location.state.allPlayers);
	const [allPlayersMap, setAllPlayersMap] = useState(location.state.allPlayersMap);
	const [allLogs, setAllLogs] = useState<Log[]>(location.state.allLogs);
	const [currentLogId, setCurrentLogId] = useState(location.state.currentLogId);

	const onHomeClick = (() => navigate('/', { 
		state: { 
			allPlayers: allPlayers,
			allPlayersMap: allPlayersMap,
			allLogs: allLogs, 
			currentLogId: currentLogId
		} 
	}));

	const onClearClick = (() => {
		setAllPlayers(sortedPlayers);
		setAllPlayersMap(new Map(sortedPlayers.map(player => [player.id, player])));
		setAllLogs([]);
		setCurrentLogId(1);
	})

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box sx={{ m: 2 }}>
				<Typography fontSize={30} textAlign={'center'}>
					74th Open and Women National Championships 2023 - Dr Wong Yip Chong Cup
				</Typography>
				<Stack direction='row' spacing={10} justifyContent='center' margin={2}>
					<Button variant="contained" color='success' onClick={onHomeClick}>
						Home
					</Button>
					<Typography fontSize={25} textAlign={'center'}>
						Round 3
					</Typography>
					<Button variant="contained" color='error' onClick={onClearClick}>
						Clear
					</Button>
				</Stack>
				<Stack direction='row' spacing={5}>
					<Box sx={{ height: 500, width: '60%' }}>
						<Typography fontSize={20} margin={'2%'} textAlign={'center'}>
							Time Sheet - Admin
						</Typography>
						<DataGrid
							rows={allLogs}
							columns={adminLogColumns}
							pageSize={100}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							components={{ Toolbar: GridToolbar }}
						/>
					</Box>
					<Box 
						sx={{
							height: 500,
							width: '30%',
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
							columns={adminPlayerColumns}
							pageSize={50}
							checkboxSelection={false}
							experimentalFeatures={{ newEditingApi: true }}
							components={{ Toolbar: GridToolbar }}
						/>
					</Box>
				</Stack>

			</Box>
		</ThemeProvider>

	);
}
  
export default Admin;