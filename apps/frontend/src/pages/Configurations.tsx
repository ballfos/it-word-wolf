import {
	Button,
	Center,
	Heading,
	HStack,
	Icon,
	Separator,
	VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import NumberStepper from "@/components/NumberStepper";
import StepIndicator from "@/components/StepIndicator";
import TextInputList from "@/components/TextInputList";
import CategoriesAccordion from "@/components/CategoriesAccordion";
import DifficultiesSlider from "@/components/DifficultiesSlider";
import useCategories from "@/hooks/useCategories";
import useDifficulties from "@/hooks/useDifficulties";
import { getMaxBelowHalf } from "@/utils";
import GradientCard from "@/components/GradientCard";
import CheckBoxList from "@/components/CheckBoxList";
const STEPS = ["人数入力", "名前入力", "詳細設定"];
const MIN_PLAYER_COUNT = 3;
const MAX_PLAYER_COUNT = 20;

export default function Configurations() {
	const navigate = useNavigate();
	const difficulties = useDifficulties();
	const categories = useCategories();

	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [playerCount, setPlayerCount] = useState(4);
	const [wolfCount, setWolfCount] = useState(1);
	const [maxWolfCount, setMaxWolfCount] = useState(1);
	const [playerNames, setPlayerNames] = useState<string[]>(
		Array(playerCount).fill(""),
	);

	const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
		[],
	);
	const [minLevel, setMinLevel] = useState<number>(1);
	const [maxLevel, setMaxLevel] = useState<number>(4);

	useEffect(() => {
		setSelectedCategoryNames(categories.map((category) => category.name));
	}, [categories]);

	useEffect(() => {
		setMaxWolfCount(getMaxBelowHalf(playerCount));
		if (wolfCount > maxWolfCount) {
			setWolfCount(maxWolfCount);
		}
	}, [playerCount, maxWolfCount, wolfCount]);

	useEffect(() => {
		setPlayerNames(Array(playerCount).fill(""));
	}, [playerCount]); /* ===========================
	 * イベントハンドラ
	 * =========================== */
	const handleClearPlayerNames = () => {
		setPlayerNames(Array(playerCount).fill(""));
	};
	const handleFillPlayerNames = () => {
		const names = Array.from(
			{ length: playerCount },
			(_, i) => `プレイヤー${i + 1}`,
		);
		setPlayerNames(names);
	};

	const handleNext = () => {
		if (currentStepIndex === 1) {
			if (playerNames.some((name) => name.trim() === "")) {
				toaster.create({
					description: "全てのプレイヤー名を入力してください。",
					type: "error",
					closable: true,
					duration: 3000,
				});
				return;
			}
			if (new Set(playerNames).size !== playerNames.length) {
				toaster.create({
					description: "プレイヤー名は重複しないように入力してください。",
					type: "error",
					closable: true,
					duration: 3000,
				});
				return;
			}
		}

		if (currentStepIndex < STEPS.length - 1) {
			setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
		} else {
			// 入力のバリデーション
			if (playerCount < MIN_PLAYER_COUNT || playerCount > MAX_PLAYER_COUNT) {
				toaster.create({
					description: `プレイヤー人数は${MIN_PLAYER_COUNT}〜${MAX_PLAYER_COUNT}の範囲で入力してください。`,
					type: "error",
					closable: true,
					duration: 3000,
				});
				return;
			}

			if (selectedCategoryNames.length === 0) {
				toaster.create({
					description: "カテゴリを1つ以上選択してください。",
					type: "error",
					closable: true,
					duration: 3000,
				});
				return;
			}

			navigate("/assignment", {
				state: {
					players: playerNames.map((name) => ({
						name: name.trim(),
					})),
					categories: categories.filter((category) =>
						selectedCategoryNames.includes(category.name),
					),
					minLevel,
					maxLevel,
					difficulties,
					wolfCount,
				},
			});
		}
	};
	const handleBack = () => {
		if (currentStepIndex === 0) {
			navigate("/");
		} else {
			setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
		}
	};

	/* ===========================
	 * レンダリング
	 * =========================== */
	return (
		<Center flexGrow={1} w="full" p={4}>
			<GradientCard w="full" maxW="md" p={6}>
				<Heading as="h2" size="xl">
					ゲーム設定
				</Heading>
				<Separator w="full" />

				{/* ステップインジケーター */}
				<StepIndicator steps={STEPS} currentIndex={currentStepIndex} />

				{currentStepIndex === 0 && (
					<VStack p={4}>
						{/* プレイヤー人数入力 */}
						<Heading as="h3" size="lg">
							プレイヤー人数を入力
						</Heading>
						<NumberStepper
							value={playerCount}
							onValueChange={setPlayerCount}
							min={MIN_PLAYER_COUNT}
							max={MAX_PLAYER_COUNT}
						/>
						<Heading as="h3" size="lg" mt={8}>
							ウルフの人数を入力
						</Heading>
						<NumberStepper
							value={wolfCount}
							onValueChange={setWolfCount}
							min={1}
							max={maxWolfCount}
						/>
					</VStack>
				)}

				{currentStepIndex === 1 && (
					<>
						{/* プレイヤー名入力 */}
						<Heading as="h3" size="lg" mt={8}>
							プレイヤー名を入力
						</Heading>
						<Center mb={4}>
							<Icon as={LuUser} boxSize={8} color="teal.300" />
						</Center>
						<TextInputList
							values={playerNames}
							onValuesChange={setPlayerNames}
							placeholder="プレイヤー名を入力"
							startElement={
								<Icon>
									<LuUser />
								</Icon>
							}
						/>
						<HStack w="full" justifyContent="right" mt={4}>
							<Button
								colorScheme="teal"
								variant="subtle"
								onClick={handleClearPlayerNames}
								mb={4}
								size="sm"
							>
								入力削除
							</Button>
							<Button
								colorScheme="teal"
								variant="subtle"
								onClick={handleFillPlayerNames}
								mb={4}
								size="sm"
							>
								入力自動
							</Button>
						</HStack>
					</>
				)}
				{currentStepIndex === 2 && (
					<VStack p={4} gap={8}>
						{/* 難易度選択 */}
						<Heading as="h3" size="lg">
							難易度選択
						</Heading>
						<DifficultiesSlider
							minLevel={minLevel}
							maxLevel={maxLevel}
							setMinLevel={setMinLevel}
							setMaxLevel={setMaxLevel}
							difficulties={difficulties}
						/>

						{/* カテゴリ選択 */}
						<Heading as="h3" size="lg">
							カテゴリ選択
						</Heading>
						<CheckBoxList
							items={categories.map((category) => category.name)}
							selectedItems={selectedCategoryNames}
							onChange={setSelectedCategoryNames}
						/>
					</VStack>
				)}

				<Separator w="full" my={2} />

				<HStack w="full" justifyContent="space-between">
					{/* 戻るボタン */}
					<Button
						colorScheme="teal"
						variant="ghost"
						fontWeight="bold"
						onClick={handleBack}
					>
						<Icon as={LuArrowLeft} />
						戻る
					</Button>
					{/* 次へボタン */}
					<Button
						colorScheme="teal"
						variant={currentStepIndex === STEPS.length - 1 ? "solid" : "ghost"}
						fontWeight="bold"
						onClick={handleNext}
					>
						{currentStepIndex === STEPS.length - 1 ? "開始" : "次へ"}
						<Icon as={LuArrowRight} />
					</Button>
				</HStack>
			</GradientCard>
		</Center>
	);
}
