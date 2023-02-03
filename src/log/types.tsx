import { SHORT_TITLE } from '../constants';

export type Log = {
	id: number;
	playerId: number;
	title?: SHORT_TITLE;
	displayedName: string;
	timeOut: Date;
	displayedTimeOut: string;
	timeIn?: Date;
	displayedTimeIn?: string;
	timeTaken?: number;
	displayedTimeTaken?: string;
	deleted: boolean;
};
