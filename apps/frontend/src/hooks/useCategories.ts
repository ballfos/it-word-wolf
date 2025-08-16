import { useEffect, useState } from "react";
import { fetchCategories, type Category } from "@/api";

export default function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories();
				setCategories(data);
			} catch (error) {
				console.error("Failed to load categories:", error);
			}
		};
		loadCategories();
	}, []);

	return categories;
}
