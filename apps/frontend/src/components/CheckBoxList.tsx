import { CheckboxCard, CheckboxGroup, VStack } from "@chakra-ui/react";

interface CheckBoxListProps {
	items: string[];
	selectedItems: string[];
	onChange: (selectedItems: string[]) => void;
}

export default function CheckBoxList({
	items,
	selectedItems,
	onChange,
}: CheckBoxListProps) {
	return (
		<CheckboxGroup
			value={selectedItems}
			onValueChange={(values) => values && onChange(values)}
		>
			<VStack align="start" gap={4}>
				{items.map((item) => (
					<CheckboxCard.Root key={item} value={item}>
						<CheckboxCard.Label>{item}</CheckboxCard.Label>
						<CheckboxCard.Control />
					</CheckboxCard.Root>
				))}
			</VStack>
		</CheckboxGroup>
	);
}
