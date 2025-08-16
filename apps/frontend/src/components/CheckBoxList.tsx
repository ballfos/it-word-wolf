import {
	Checkbox,
	CheckboxCard,
	CheckboxGroup,
	Fieldset,
	For,
	VStack,
} from "@chakra-ui/react";

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
	const allChecked = items.length === selectedItems.length;
	const indeterminate = selectedItems.length > 0 && !allChecked;

	return (
		<VStack align="start" w="full" gap={4}>
			<Checkbox.Root
				variant="subtle"
				checked={indeterminate ? "indeterminate" : allChecked}
				onCheckedChange={() => {
					if (allChecked) {
						onChange([]);
					} else {
						onChange(items);
					}
				}}
				cursor="pointer"
			>
				<Checkbox.HiddenInput />
				<Checkbox.Control />
				<Checkbox.Label>
					{items.length === selectedItems.length ? "選択解除" : "全て選択"}
				</Checkbox.Label>
			</Checkbox.Root>
			<CheckboxGroup
				ms={6}
				value={selectedItems}
				onValueChange={(values) => onChange(values)}
				gap={4}
			>
				<For each={items}>
					{(item) => (
						<Checkbox.Root
							key={item}
							value={item}
							variant="subtle"
							cursor="pointer"
						>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label>{item}</Checkbox.Label>
						</Checkbox.Root>
					)}
				</For>
			</CheckboxGroup>
		</VStack>
	);
}
