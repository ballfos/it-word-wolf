import { useCallback, useRef, useState } from "react";

export default function useTimer(initialTime: number) {
	const [time, setTime] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(false);
	const intervalIdRef = useRef<number | null>(null);

	const start = useCallback(() => {
		if (!isRunning) {
			setIsRunning(true);
			intervalIdRef.current = window.setInterval(() => {
				setTime((prevTime) => {
					if (prevTime <= 0) {
						clearInterval(intervalIdRef.current || undefined);
						setIsRunning(false);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
	}, [isRunning]);

	const stop = useCallback(() => {
		if (isRunning && intervalIdRef.current) {
			clearInterval(intervalIdRef.current);
			setIsRunning(false);
			intervalIdRef.current = null;
		}
	}, [isRunning]);

	const rewind = useCallback((seconds: number) => {
		setTime((prevTime) => Math.max(prevTime - seconds, 0));
	}, []);

	const forward = useCallback((seconds: number) => {
		setTime((prevTime) => prevTime + seconds);
	}, []);

	return { time, isRunning, start, stop, rewind, forward };
}
