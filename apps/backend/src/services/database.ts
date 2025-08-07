import type { D1Database } from "@cloudflare/workers-types";
import camelcaseKeys from "camelcase-keys";

export type CategoryRecord = {
	id: number;
	name: string;
};

export type SubcategoryRecord = {
	id: number;
	categoryId: number;
	name: string;
};

export type DifficultyRecord = {
	id: number;
	level: number;
	name: string;
};

export type WordRecord = {
	id: number;
	categoryId: number;
	categoryName: string;
	subcategoryId: number;
	subcategoryName: string;
	difficultyId: number;
	difficultyName: string;
	wordEn: string;
	wordJa: string;
	explanation: string;
};

export async function getCategories(db: D1Database): Promise<CategoryRecord[]> {
	const { results } = await db
		.prepare("SELECT * FROM categories")
		.all<CategoryRecord>();
	return results;
}

export async function getCategoryById(
	db: D1Database,
	id: number,
): Promise<CategoryRecord | null> {
	const result = await db
		.prepare("SELECT * FROM categories WHERE id = ?")
		.bind(id)
		.first<CategoryRecord>();
	return result;
}

export async function getRandomSubcategoryByCategoryId(
	db: D1Database,
	categoryId: number,
): Promise<SubcategoryRecord | null> {
	const result = await db
		.prepare(
			"SELECT * FROM subcategories WHERE category_id = ? ORDER BY RANDOM() LIMIT 1",
		)
		.bind(categoryId)
		.first();
	if (!result) {
		return null;
	}
	return camelcaseKeys(result, { deep: true }) as SubcategoryRecord;
}

export async function getSubcategoriesByCategoryId(
	db: D1Database,
	categoryId: number,
): Promise<SubcategoryRecord[]> {
	const { results } = await db
		.prepare("SELECT * FROM subcategories WHERE category_id = ?")
		.bind(categoryId)
		.all<SubcategoryRecord>();
	return results.map((subcategory) =>
		camelcaseKeys(subcategory, { deep: true }),
	) as SubcategoryRecord[];
}

export async function getRandomCategory(
	db: D1Database,
): Promise<CategoryRecord | null> {
	const result = await db
		.prepare("SELECT id, name FROM categories ORDER BY RANDOM() LIMIT 1")
		.first<CategoryRecord>();
	return result;
}

export async function getDifficulties(
	db: D1Database,
): Promise<DifficultyRecord[]> {
	const { results } = await db
		.prepare("SELECT * FROM difficulties")
		.all<DifficultyRecord>();
	return results;
}

export async function getDifficultyById(
	db: D1Database,
	id: number,
): Promise<DifficultyRecord | null> {
	const result = await db
		.prepare("SELECT * FROM difficulties WHERE id = ?")
		.bind(id)
		.first<DifficultyRecord>();
	return result;
}

export async function getRandomDifficulty(
	db: D1Database,
): Promise<DifficultyRecord | null> {
	const result = await db
		.prepare("SELECT id, name FROM difficulties ORDER BY RANDOM() LIMIT 1")
		.first<DifficultyRecord>();
	return result;
}

export async function getWords(
	db: D1Database,
	subcategoryId: number,
	difficultyId: number,
): Promise<WordRecord[]> {
	const { results } = await db
		.prepare(
			`SELECT w.id, s.category_id, c.name AS category_name, w.subcategory_id, s.name AS subcategory_name, w.difficulty_id, d.name AS difficulty_name, w.word_en, w.word_ja, w.explanation
			FROM words w
			JOIN subcategories s ON w.subcategory_id = s.id
			JOIN difficulties d ON w.difficulty_id = d.id
			JOIN categories c ON s.category_id = c.id
			WHERE w.subcategory_id = ? AND w.difficulty_id = ?`,
		)
		.bind(subcategoryId, difficultyId)
		.all();
	return results.map((word) =>
		camelcaseKeys(word, { deep: true }),
	) as WordRecord[];
}
