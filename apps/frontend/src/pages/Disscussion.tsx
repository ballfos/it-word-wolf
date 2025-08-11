import {
	Button,
	Center,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	TiMediaFastForward,
	TiMediaPause,
	TiMediaPlay,
	TiMediaRewind,
} from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import useTimer from "@/hooks/useTimer";
import { formatTime } from "@/utils";
import { useEffect } from "react";

export default function Disscussion() {
	const navigate = useNavigate();
	const location = useLocation();
	const { time, isRunning, start, stop, rewind, forward } = useTimer(5 * 60);

	useEffect(() => {
		if (!location.state) {
			navigate("/", { replace: true });
		}
	}, [location.state, navigate]);

	if (!location.state) {
		return null;
	}

	return (
		<Center minH="100svh" w="100vw" p={4}>
			<VStack
				bgGradient="to-br"
				gradientFrom="teal.700"
				gradientTo="blue.700"
				p={8}
				gap={8}
				borderRadius="md"
				w="md"
			>
				<Heading>話し合いタイム</Heading>
				<Text fontSize="6xl" fontWeight="bold">
					{formatTime(time)}
				</Text>

				{/* <Button colorScheme="teal" size="lg" onClick={isRunning ? stop : start}>
					{isRunning ? "一時停止" : "開始"}
				</Button> */}
				<HStack gap={4}>
					<IconButton variant="subtle" onClick={() => rewind(30)}>
						<TiMediaRewind />
					</IconButton>
					<IconButton
						variant="subtle"
						onClick={isRunning ? stop : start}
						disabled={time <= 0}
					>
						{isRunning ? <TiMediaPause /> : <TiMediaPlay />}
					</IconButton>
					<IconButton variant="subtle" onClick={() => forward(30)}>
						<TiMediaFastForward />
					</IconButton>
				</HStack>
				<Button
					colorScheme="red"
					size="lg"
					onClick={() => navigate("/result", { state: location.state })}
				>
					終了
				</Button>
			</VStack>
		</Center>
	);
}
