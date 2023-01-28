import { Typography } from "@mui/material";
import { GridCellParams, GridColumns } from "@mui/x-data-grid";
import { SetStateAction } from "react";

export enum STATUS {
	IN = 'In',
	OUT = 'Out'
}

export const logColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 300,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'displayedTimeOut',
		headerName: 'Time Out',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'displayedTimeIn',
		headerName: 'Time In',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'nothing',
		headerName: '',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
];

export const playerColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name', 
		width: 400,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'status',
		headerName: 'Action',
		width: 100,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params: { row: { id: SetStateAction<number>; status: STATUS; }; }) => {
			if (params.row.status == STATUS.IN) {
				return (
					<Typography fontSize={15} margin={'2%'} textAlign={'center'}>
						Sign Out
					</Typography>
				)
			} else {
				return (
					<Typography fontSize={15} margin={'2%'} textAlign={'center'}>
						Sign In
					</Typography>
				)
			}
		}
	}
]

export const adminLogColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 300,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'displayedTimeOut',
		headerName: 'Time Out',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'displayedTimeIn',
		headerName: 'Time In',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'displayedTimeTaken',
		headerName: 'Time Taken',
		width: 150,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'deleted',
		headerName: 'Deleted?',
		width: 100,
		headerAlign: 'center',
		align: 'center'
	}
];

export const adminPlayerColumns: GridColumns = [
	{
		field: 'name',
		headerName: 'Name', 
		width: 300,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'exits',
		headerName: 'Exits', 
		width: 100,
		headerAlign: 'center',
		align: 'center'
	}
]
