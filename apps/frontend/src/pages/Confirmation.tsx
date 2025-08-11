import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Word } from "@/api";

export default function Confirmation() {
	const navigate = useNavigate();
	const location = useLocation();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [showWord, setShowWord] = useState(false);

	useEffect(() => {
		if (!location.state) {
			navigate("/");
		}
	}, [location.state, navigate]);

	if (!location.state) {
		return null;
	}

	const { players } = location.state as {
		players: { name: string; isWolf: boolean; word: Word }[];
	};

	/* ===========================
	 * イベントハンドラ
	 * =========================== */
	const handleShowWord = () => {
		setShowWord(true);
	};
	const handleNextPlayer = () => {
		if (currentIndex === players.length - 1) {
			navigate("/disscussion", {
				state: location.state,
			});
			return;
		}
		setCurrentIndex((prev) => Math.min(prev + 1, players.length - 1));
		setShowWord(false);
	};

	/* ===========================
	 * レンダリング
	 * =========================== */
	// 順番にプレイヤー情報を表示
	return (
		<Center h="100svh" w="100vw" px={4}>
			<VStack
				bgGradient="to-br"
				gradientFrom="teal.700"
				gradientTo="blue.700"
				p={8}
				gap={8}
				borderRadius="md"
				boxShadow="lg"
				w="full"
				maxW="md"
			>
				<Text>
					{players[currentIndex].name}
					さん
				</Text>

				{showWord && (
					<>
						<Text fontSize="xl" fontWeight="bold">
							{players[currentIndex].word.wordJa === null
								? players[currentIndex].word.wordEn
								: `${players[currentIndex].word.wordEn} (${players[currentIndex].word.wordJa})`}
						</Text>
						<Text fontSize="md" color="gray.300">
							{players[currentIndex].word.explanation}
						</Text>
					</>
				)}

				<Button
					colorScheme="teal"
					onClick={showWord ? handleNextPlayer : handleShowWord}
				>
					{showWord ? "次のプレイヤー" : "単語を表示"}
				</Button>
			</VStack>
		</Center>
	);
}
