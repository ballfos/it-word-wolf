import { Input, InputGroup, VStack } from "@chakra-ui/react";

interface TextInputListProps {
	values: string[];
	onValuesChange: (values: string[]) => void;
	placeholder?: string;
	startElement?: React.ReactNode;
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function TextInputList({
	values,
	onValuesChange,
	placeholder = "Add item",
	startElement = null,
	props = {},
}: TextInputListProps) {
	return (
		<VStack gap={2} w="full" {...props}>
			{values.map((value, index) => (
				<InputGroup key={index} startElement={startElement}>
					<Input
						variant="subtle"
						value={value}
						onChange={(e) => {
							const newValues = [...values];
							newValues[index] = e.target.value;
							onValuesChange(newValues);
						}}
						placeholder={placeholder}
					/>
				</InputGroup>
			))}
		</VStack>
	);
}
