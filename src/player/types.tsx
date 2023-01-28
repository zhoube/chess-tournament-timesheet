import { STATUS } from "../constants";

export type Player = {
    id: number;
    name: string;
    status: STATUS;
	currentLogId?: number;
	exits: number;
}