import type { D1Database } from "@cloudflare/workers-types";

export type CategoryRecord = {
	id: number;
	name: string;
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

export async function getRandomCategory(
	db: D1Database,
): Promise<CategoryRecord | null> {
	const result = await db
		.prepare("SELECT id, name FROM categories ORDER BY RANDOM() LIMIT 1")
		.first<CategoryRecord>();
	return result;
}

export type DifficultyRecord = {
	id: number;
	level: number;
	name: string;
};

export async function getDifficulties(
	db: D1Database,
): Promise<DifficultyRecord[]> {
	const { results } = await db
		.prepare("SELECT * FROM difficulties")
		.all<DifficultyRecord>();
	return results;
}

export async function getDifficultyByLevel(
	db: D1Database,
	level: number,
): Promise<DifficultyRecord | null> {
	const result = await db
		.prepare("SELECT * FROM difficulties WHERE level = ?")
		.bind(level)
		.first<DifficultyRecord>();
	return result;
}

export async function getRandomDifficulty(
	db: D1Database,
): Promise<DifficultyRecord | null> {
	const result = await db
		.prepare(
			"SELECT id, level, name FROM difficulties ORDER BY RANDOM() LIMIT 1",
		)
		.first<DifficultyRecord>();
	return result;
}

export type HistoryRecord = {
	id: number;
	category_id: number;
	difficulty_id: number;
	sub_category: string;
	words: string;
	created_at: string;
};

export async function getRandomHistoryByCategoryAndDifficulty(
	db: D1Database,
	categoryId: number,
	difficultyId: number,
): Promise<HistoryRecord | null> {
	const result = await db
		.prepare(
			"SELECT * FROM history WHERE category_id = ? AND difficulty_id = ? ORDER BY RANDOM() LIMIT 1",
		)
		.bind(categoryId, difficultyId)
		.first<HistoryRecord>();
	return result;
}

export async function addHistory(
	db: D1Database,
	categoryId: number,
	subCategory: string,
	difficultyId: number,
	words: string,
): Promise<void> {
	await db
		.prepare(
			"INSERT INTO history (category_id, sub_category, difficulty_id, words) VALUES (?, ?, ?, ?)",
		)
		.bind(categoryId, subCategory, difficultyId, words)
		.run();
}
