import { Accordion, VStack, For, Checkbox } from "@chakra-ui/react";
import type { Category } from "@/api";
export type CategoriesAccordionProps = {
    categories: Category[];
    selectedCategories: Category[];
    setSelectedCategories: (categories: Category[]) => void;
};

export default function CategoriesAccordion({ categories, selectedCategories, setSelectedCategories }: CategoriesAccordionProps) {
    const toggleCategory = (category: Category) => {
        const updated = selectedCategories.some(d => d.id === category.id)
            ? selectedCategories.filter(d => d.id !== category.id)
            : [...selectedCategories, category]

        setSelectedCategories(updated)
    }
    return (
        <Accordion.Root collapsible size="sm" width="100%">
            <Accordion.Item value="domain" border="none" >
                <h2>
                    <Accordion.ItemTrigger>
                        分野を選択
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent>
                    <VStack align="start">
                        <For each={categories}>
                            {(category) => (
                                <Checkbox.Root
                                    key={category.id}
                                    defaultChecked
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
