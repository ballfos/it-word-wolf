const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Category = {
	id: number;
	name: string;
};
export type Difficulty = {
	id: number;
	name: string;
};
export type Word = {
	id: number;
	categoryId: number;
	categoryName: string;
	subCategoryId: number;
	subCategoryName: string;
	difficultyId: number;
	difficultyName: string;
	wordEn: string;
	wordJa: string;
	explanation: string;
};

export async function fetchCategories(): Promise<Category[]> {
	const response = await fetch(`${API_BASE_URL}/categories`);
	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}
	return response.json();
}

export async function fetchDifficulties(): Promise<Difficulty[]> {
	const response = await fetch(`${API_BASE_URL}/difficulties`);
	if (!response.ok) {
		throw new Error("Failed to fetch difficulties");
	}
	return response.json();
}

export async function fetchWords(
	categoryId: number,
	difficultyId: number,
): Promise<Word[]> {
	const response = await fetch(
		`${API_BASE_URL}/words/random?category_id=${categoryId}&difficulty_id=${difficultyId}`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch words");
	}
	return response.json();
}
