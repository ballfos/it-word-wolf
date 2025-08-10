import {
	Accordion,
	VStack,
	For,
	Checkbox,
	Button,
	HStack,
} from "@chakra-ui/react";
import type { Category } from "@/api";
export type CategoriesAccordionProps = {
	categories: Category[];
	selectedCategories: Category[];
	setSelectedCategories: (categories: Category[]) => void;
};

export default function CategoriesAccordion({
	categories,
	selectedCategories,
	setSelectedCategories,
}: CategoriesAccordionProps) {
	const toggleCategory = (category: Category) => {
		const updated = selectedCategories.some((d) => d.id === category.id)
			? selectedCategories.filter((d) => d.id !== category.id)
			: [...selectedCategories, category];

		setSelectedCategories(updated);
	};
	return (
		<Accordion.Root
			collapsible
			size="sm"
			width="100%"
			defaultValue={["domain"]}
		>
			<Accordion.Item value="domain" border="none">
				<h2>
					<HStack justify="space-between" width="100%">
						<Accordion.ItemTrigger>
							分野を選択
							<Accordion.ItemIndicator />
						</Accordion.ItemTrigger>
						<Button
							size="2xs"
							rounded="2xl"
							colorPalette="gray"
							variant="outline"
							onClick={() => setSelectedCategories([])}
						>
							リセット
						</Button>
					</HStack>
				</h2>
				<Accordion.ItemContent>
					<VStack align="start">
						<For each={categories}>
							{(category) => (
								<Checkbox.Root
									key={category.id}
									checked={selectedCategories.some((d) => d.id === category.id)}
									mt="2"
									value={category.name}
									onCheckedChange={() => toggleCategory(category)}
								>
									<Checkbox.HiddenInput />
									<Checkbox.Control />
									<Checkbox.Label>{category.name}</Checkbox.Label>
								</Checkbox.Root>
							)}
						</For>
					</VStack>
				</Accordion.ItemContent>
			</Accordion.Item>
		</Accordion.Root>
	);
}
