import { Slider } from "@chakra-ui/react";
import type { Difficulty } from "@/api";
export type marks = {
	value: number;
	label: string;
};

export type DifficultiesSliderProps = {
	minLevel: number;
	maxLevel: number;
	setMinLevel: (level: number) => void;
	setMaxLevel: (level: number) => void;
	difficulties: Difficulty[];
};

export default function DifficultiesSlider({
	minLevel,
	maxLevel,
	setMinLevel,
	setMaxLevel,
	difficulties,
}: DifficultiesSliderProps) {
	const handleLevelChange = (value: number, value2: number) => {
		setMinLevel(value);
		setMaxLevel(value2);
		localStorage.setItem("minLevel", String(value));
		localStorage.setItem("maxLevel", String(value2));
	};
	const marks: marks[] = difficulties.map((difficulty) => ({
		value: difficulty.id,
		label: difficulty.name,
	}));
	return (
		<Slider.Root
			width="200px"
			value={[minLevel, maxLevel]}
			step={1}
			min={1}
			max={4}
			onValueChange={(e) => handleLevelChange(e.value[0], e.value[1])}
			colorPalette={"purple"}
			size="sm"
		>
			{/* <Slider.Label>難易度の範囲を選択</Slider.Label> */}
			<Slider.Control>
				<Slider.Track>
					<Slider.Range />
				</Slider.Track>
				<Slider.Thumbs boxSize={4} borderColor="gray.500" />
				<Slider.Marks marks={marks} style={{ whiteSpace: "nowrap" }} />
			</Slider.Control>
		</Slider.Root>
	);
}
