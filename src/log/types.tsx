export type Log = {
	id: number;
	playerId: number;
	displayedName: string;
	timeOut: Date;
	displayedTimeOut: string;
	timeIn?: Date;
	displayedTimeIn?: string;
	timeTaken?: number;
	displayedTimeTaken?: string;
	deleted: boolean;
};
