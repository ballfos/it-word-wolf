import { HStack, Icon, Text } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";

interface StepIndicatorProps {
	steps: string[];
	currentIndex: number;
}

export default function StepIndicator({
	steps,
	currentIndex,
}: StepIndicatorProps) {
	return (
		<HStack
			separator={
				<Icon as={LuChevronRight} borderInlineStartColor="transparent" />
			}
		>
			{steps.map((step, index) => (
				<Text
					key={index}
					fontWeight={index === currentIndex ? "bold" : "normal"}
					color={index === currentIndex ? "yellow.300" : "gray.500"}
				>
					{step}
				</Text>
			))}
		</HStack>
	);
}
