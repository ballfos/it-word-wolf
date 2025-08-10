export function formatTime(seconds: number) {
	const m = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	const s = (seconds % 60).toString().padStart(2, "0");
	return `${m}:${s}`;
}

export function getMaxBelowHalf(num: number): number {
	return Math.ceil(num / 2) - 1;
}
