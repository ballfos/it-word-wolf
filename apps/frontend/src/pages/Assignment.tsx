import { Heading, Spinner, VStack } from "@chakra-ui/react";
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
		// プレイヤー情報を取得
		const { players, categories, minLevel, maxLevel } = location.state as {
			players: { name: string; isWolf: boolean; word: Word }[];
			categories: { id: number; name: string }[];
			minLevel: number;
			maxLevel: number;
		};
		console.log(categories);

		async function fetchData() {
			const categoryId = categories[Math.floor(Math.random() * categories.length)].id;
			const difficultyLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
			console.log(minLevel, maxLevel, difficultyLevel);

			const words = await fetchWords(categoryId, difficultyLevel);
			if (!words || words.length === 0) {
				alert("お題の取得に失敗しました。");
				navigate("/");
				return;
			}
			// 市民と人狼の割り当て
			const wolfIndex = Math.floor(Math.random() * players.length);
			const citizenWordIndex = Math.floor(Math.random() * words.length);
			const wolfWordIndex =
				(citizenWordIndex +
					Math.floor(Math.random() * (words.length - 1)) +
					1) %
				words.length;

			navigate("/confirmation", {
				state: {
					players: players.map((player, index) => ({
						name: player.name,
						isWolf: index === wolfIndex,
						word:
							index === wolfIndex
								? words[wolfWordIndex]
								: words[citizenWordIndex],
					})),
					citizenWord: words[citizenWordIndex],
					wolfWord: words[wolfWordIndex],
					categories: categories,
					minLevel,
					maxLevel,
				},
			});
		}
		fetchData();
	}, [location.state, navigate]);

	// プレイヤー情報がない場合はホームにリダイレクト
	if (!location.state) {
		return null;
	}

	/* ===========================
	 * レンダリング
	 * =========================== */
	return (
		<VStack
			minH="100svh"
			w="100svw"
			pt="10"
			justifyContent="center"
			px={4}
			gap={4}
		>
			<Heading>お題生成中</Heading>
			<Spinner />
		</VStack>
	);
}
