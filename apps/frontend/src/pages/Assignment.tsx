import { Center, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchWords, type Word } from "@/api";

export default function Assignment() {
	const navigate = useNavigate();
	const location = useLocation();

	/* ===========================
	 * データ取得
	 * =========================== */
	useEffect(() => {
		if (!location.state) {
			navigate("/");
		}

		const { players, categories, minLevel, maxLevel, difficulties, wolfCount } =
			location.state as {
				players: { name: string; isWolf: boolean; word: Word }[];
				categories: { id: number; name: string }[];
				minLevel: number;
				maxLevel: number;
				difficulties: { id: number; name: string }[];
				wolfCount: number;
			};

		async function fetchData() {
			const categoryId =
				categories[Math.floor(Math.random() * categories.length)].id;
			const difficultyLevel =
				Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
			const words = await fetchWords(categoryId, difficultyLevel);

			if (!words || words.length === 0) {
				alert("お題の取得に失敗しました。");
				navigate("/");
				return;
			}

			// 市民ワード & 人狼ワード
			const citizenWordIndex = Math.floor(Math.random() * words.length);
			const wolfWordIndex =
				(citizenWordIndex +
					Math.floor(Math.random() * (words.length - 1)) +
					1) %
				words.length;

			// 順番を変えずにランダムなインデックスをwolfCount分選ぶ
			const indices = Array.from({ length: players.length }, (_, i) => i);

			// Fisher-Yatesシャッフル
			for (let i = indices.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[indices[i], indices[j]] = [indices[j], indices[i]];
			}

			const wolfIndices = new Set(indices.slice(0, wolfCount));

			// 元配列を元にisWolfとwordを設定
			const assignedPlayers = players.map((player, index) => ({
				...player,
				isWolf: wolfIndices.has(index),
				word: wolfIndices.has(index)
					? words[wolfWordIndex]
					: words[citizenWordIndex],
			}));

			navigate("/confirmation", {
				state: {
					players: assignedPlayers,
					citizenWord: words[citizenWordIndex],
					wolfWord: words[wolfWordIndex],
					categories,
					minLevel,
					maxLevel,
					categoryId,
					difficultyLevel,
					difficulties,
					wolfCount,
				},
			});
		}

		fetchData();
	}, [location.state, navigate]);

	if (!location.state) {
		return null;
	}

	return (
		<Center flexGrow={1} w="full" p={4}>
			<VStack pt="10" justifyContent="center" px={4} gap={4}>
				<Heading>お題生成中</Heading>
				<Spinner />
			</VStack>
		</Center>
	);
}
