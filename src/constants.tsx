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

export const ROUND_NUMBER = 5;

export const logColumns: GridColumns = [
	{
		field: 'title',
		headerName: 'Title',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedName',
		headerName: 'Name',
		width: 245,
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
		field: 'title',
		headerName: 'Title',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 379,
		headerAlign: 'center',
		align: 'center',
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
];

export const adminLogColumns: GridColumns = [
	{
		field: 'title',
		headerName: 'Title',
		width: 75,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedName',
		headerName: 'Name',
		width: 180,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeOut',
		headerName: 'Time Out',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeIn',
		headerName: 'Time In',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'displayedTimeTaken',
		headerName: 'Time Taken',
		width: 100,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'deleted',
		headerName: 'Deleted?',
		width: 75,
		headerAlign: 'center',
		align: 'center',
	},
];

export const adminPlayerColumns: GridColumns = [
	{
		field: 'title',
		headerName: 'Title',
		width: 75,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 150,
		headerAlign: 'center',
		align: 'center',
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
	{
		field: 'displayedTimeGameEnded',
		headerName: 'Game Ended At',
		width: 150,
		headerAlign: 'center',
		align: 'center',
	},
];
