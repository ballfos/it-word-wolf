import {
	Button,
	Center,
	Float,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdGames, MdHome } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import type { Word } from "@/api";

export default function Result() {
	const navigate = useNavigate();
	const location = useLocation();

	const [showCitizen, setShowCitizen] = useState(false);
	const [showWolf, setShowWolf] = useState(false);

	useEffect(() => {
		if (!location.state) {
			navigate("/", { replace: true });
		}
	}, [location.state, navigate]);

	if (!location.state) {
		return null;
	}

	const { citizenWord, wolfWord } = location.state as {
		players: { name: string; isWolf: boolean; word: Word }[];
		citizenWord: Word;
		wolfWord: Word;
	};

	const { categories, categoryId, difficulties, difficultyLevel } =
		location.state as {
			categories: { id: number; name: string }[];
			categoryId: number;
			difficulties: { id: number; name: string }[];
			difficultyLevel: number;
		};

	/* ===========================
	 * イベントハンドラ
	 * =========================== */
	const handleBackToHome = () => {
		navigate("/");
	};
	const handleNextGame = () => {
		navigate("/assignment", {
			state: location.state,
		});
	};

	return (
		<Center minH="100svh" w="100vw" p={4}>
			<VStack gap={4} w="md">
				<Heading>結果</Heading>
				<Text fontSize="lg" color="gray.500">
					カテゴリ:{" "}
					{categories.find((c) => c.id === categoryId)?.name || "不明"}
				</Text>
				<Text fontSize="lg" color="gray.500">
					難易度:{" "}
					{difficulties.find((d) => d.id === difficultyLevel)?.name || "不明"}
				</Text>
				<VStack gap={4} w="full">
					<WordResultCard
						word={citizenWord}
						isWolf={false}
						showWord={showCitizen}
						setShowWord={setShowCitizen}
					/>
					<WordResultCard
						word={wolfWord}
						isWolf={true}
						showWord={showWolf}
						setShowWord={setShowWolf}
					/>
					<HStack justifyContent="space-between" w="full">
						<Button
							colorScheme="teal"
							size="lg"
							onClick={() => handleBackToHome()}
						>
							<MdHome /> ホームに戻る
						</Button>
						<Button
							colorScheme="blue"
							size="lg"
							onClick={() => handleNextGame()}
						>
							<MdGames /> 次のゲームへ
						</Button>
					</HStack>
				</VStack>
			</VStack>
		</Center>
	);
}

function WordResultCard({
	word,
	isWolf,
	showWord,
	setShowWord,
}: {
	word: Word;
	isWolf: boolean;
	showWord: boolean;
	setShowWord: (show: boolean) => void;
}) {
	return (
		<VStack position="relative" w="full" bg="gray.700" p={4} borderRadius="md">
			<Float top={4} right={10}>
				<IconButton onClick={() => setShowWord(!showWord)}>
					{showWord ? <LuEye /> : <LuEyeClosed />}
				</IconButton>
			</Float>
			<Heading size="md" color={isWolf ? "red.400" : "green.400"}>
				{isWolf ? "人狼" : "市民"}
			</Heading>
			<Text fontSize="xl" color="white">
				{showWord
					? word.wordJa
						? `${word.wordEn} (${word.wordJa})`
						: word.wordEn
					: "??????"}
			</Text>
			<Text fontSize="md" color="gray.300">
				{showWord ? word.explanation : "??????????????????"}
			</Text>
		</VStack>
	);
}
