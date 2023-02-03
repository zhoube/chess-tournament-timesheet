import { STATUS, SHORT_TITLE } from '../constants';

export type Player = {
	id: number;
	title?: SHORT_TITLE;
	name: string;
	status: STATUS;
	currentLogId?: number;
	exits: number;
	isPlaying: boolean;
	timeGameEnded?: Date;
	displayedTimeGameEnded?: string;
};
