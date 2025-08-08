import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

interface NumberStepperProps {
	value: number;
	onValueChange: (value: number) => void;
	min?: number;
	max?: number;
}

export default function NumberStepper({
	value,
	min,
	max,
	onValueChange,
}: NumberStepperProps) {
	return (
		<NumberInput.Root
			value={String(value)}
			min={min}
			max={max}
			step={1}
			onValueChange={(details) => onValueChange(details.valueAsNumber)}
		>
			<HStack>
				<NumberInput.DecrementTrigger asChild>
					<IconButton>
						<LuMinus />
					</IconButton>
				</NumberInput.DecrementTrigger>
				<NumberInput.ValueText fontSize="xl" mx="4" />
				<NumberInput.IncrementTrigger asChild>
					<IconButton>
						<LuPlus />
					</IconButton>
				</NumberInput.IncrementTrigger>
			</HStack>
		</NumberInput.Root>
	);
}
