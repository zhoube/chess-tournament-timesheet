import { Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { SetStateAction } from "react";

export enum STATUS {
	IN = 'In',
	OUT = 'Out'
}

export const logColumns: GridColumns = [
	{
		field: 'id',
		headerName: 'Seed', 
		width: 100,
		headerAlign: 'center',
		align: 'center',
		type: 'number' 
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 300,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'time_out',
		headerName: 'Time Out',
		width: 100,
		headerAlign: 'center',
		align: 'center'
	},
	{
		field: 'time_in',
		headerName: 'Time In',
		width: 100,
		headerAlign: 'center',
		align: 'center'
	},
];

export const playerColumns: GridColumns = [
	{
		field: 'id',
		headerName: 'Seed', 
		width: 100,
		headerAlign: 'center',
		align: 'center',
		type: 'number' 
	},
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
