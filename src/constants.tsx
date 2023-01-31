import { Typography } from '@mui/material';
import { GridCellParams, GridColumns } from '@mui/x-data-grid';

export enum STATUS {
	IN = 'In',
	OUT = 'Out',
}

export enum SHORT_TITLE {
	GM = 'GM',
	IM = 'IM',
	FM = 'FM',
	CM = 'CM',
	WGM = 'WGM',
	WIM = 'WIM',
	WFM = 'WFM',
	WCM = 'WCM',
	AGM = 'AGM',
	AIM = 'AIM',
	AFM = 'AFM',
	ACM = 'ACM',
}

function getNameAndTitle(params: { row: { title: any; name: any } }) {
	return `${params.row.title || ''} ${params.row.name}`;
}

export const logColumns: GridColumns = [
	{
		field: 'displayedName',
		headerName: 'Title and Name',
		width: 345,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeOut',
		headerName: 'Time Out',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeIn',
		headerName: 'Time In',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
];

export const playerColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 358,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params) => `${params.row.title || ''} ${params.row.name}`,
	},
	{
		field: 'status',
		headerName: 'Action',
		width: 150,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params) => {
			if (params.row.status == STATUS.IN) {
				return (
					<Typography
						fontSize={15}
						margin={'2%'}
						textAlign={'center'}>
						Sign Out
					</Typography>
				);
			} else {
				return (
					<Typography
						fontSize={15}
						margin={'2%'}
						textAlign={'center'}>
						Sign In
					</Typography>
				);
			}
		},
	},
	{
		field: 'isPlaying',
		headerName: 'Game Ended?',
		width: 150,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params) => {
			if (params.row.isPlaying) {
				return (
					<Typography
						fontSize={15}
						margin={'2%'}
						textAlign={'center'}>
						Game Ended
					</Typography>
				);
			} else {
				return <Typography></Typography>;
			}
		},
	},
];

export const adminLogColumns: GridColumns = [
	{
		field: 'displayedName',
		headerName: 'Name',
		width: 250,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeOut',
		headerName: 'Time Out',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeIn',
		headerName: 'Time In',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeTaken',
		headerName: 'Time Taken',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'deleted',
		headerName: 'Deleted?',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
];

export const adminPlayerColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 230,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params) => `${params.row.title || ''} ${params.row.name}`,
	},
	{
		field: 'exits',
		headerName: 'Exits',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'isPlaying',
		headerName: 'Game Ended?',
		width: 150,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params) => {
			if (params.row.isPlaying) {
				return (
					<Typography
						fontSize={15}
						margin={'2%'}
						textAlign={'center'}>
						Game Ended
					</Typography>
				);
			} else {
				return (
					<Typography
						fontSize={15}
						margin={'2%'}
						textAlign={'center'}>
						Resume Game
					</Typography>
				);
			}
		},
	},
];
