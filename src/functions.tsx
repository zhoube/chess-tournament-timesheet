export const convert_time = (milliseconds: number) => {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	return (
		minutes.toString() +
		' mins ' +
		(seconds - minutes * 60).toString() +
		' secs'
	);
};
