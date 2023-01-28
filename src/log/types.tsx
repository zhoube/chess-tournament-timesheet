export type Log = {
	id: number;
	playerId: number;
	name: string;
	timeOut: Date;
	displayedTimeOut: string;
	timeIn?: Date;
	displayedTimeIn?: string;
	timeTaken?: number;
	displayedTimeTaken?: string;
	deleted: boolean;
}