import { Heading, Spinner, VStack } from "@chakra-ui/react";
import { shuffle } from "lodash";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchWords, type Category } from "@/api";

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
		const { players, categories, wolfCount } = location.state as {
			players: { name: string }[];
			categories: Category[];
			wolfCount: number;
		};
		console.log(categories);

		async function fetchData() {
			const categoryId =
				categories[Math.floor(Math.random() * categories.length)].id;
			const words = await fetchWords(categoryId, 1);
			if (!words || words.length === 0) {
				alert("お題の取得に失敗しました。");
				navigate("/");
				return;
			}
			// 市民と人狼の割り当て
			const wolfIndices = shuffle(
				Array.from({ length: players.length }, (_, i) => i),
			).slice(0, wolfCount);
			const [citizenWord, wolfWord] = shuffle(words).slice(0, 2);

			navigate("/confirmation", {
				state: {
					players: players.map((player, index) => ({
						name: player.name,
						isWolf: wolfIndices.includes(index),
						word: wolfIndices.includes(index) ? wolfWord : citizenWord,
					})),
					citizenWord: citizenWord,
					wolfWord: wolfWord,
					wolfCount,
					categories: categories,
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
