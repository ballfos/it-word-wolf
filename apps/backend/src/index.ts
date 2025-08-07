import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import z from "zod";
import type { Bindings } from "./bindings";
import {
	type CategoryRecord,
	type DifficultyRecord,
	getCategories,
	getCategoryById,
	getDifficulties,
	getDifficultyById,
	getRandomCategory,
	getRandomDifficulty,
	getSubcategoriesByCategoryId,
	getWords,
	type SubcategoryRecord,
	type WordRecord,
} from "./services/database";

const app = new Hono<{ Bindings: Bindings }>();

// CORS設定
app.use("*", (c, next) => {
	const arrowOrigin = c.env.FRONTEND_URL;
	if (arrowOrigin) {
		return cors({
			origin: arrowOrigin,
			allowMethods: ["GET", "POST", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
		})(c, next);
	}
	return next();
});

// APIエンドポイントの定義
app.get("/categories", async (c) => {
	const categoryRecords = await getCategories(c.env.DB);
	return c.json(categoryRecords);
});

app.get("/difficulties", async (c) => {
	const difficultyRecords = await getDifficulties(c.env.DB);
	return c.json(difficultyRecords);
});

app.get(
	"words/random",
	zValidator(
		"query",
		z.object({
			category_id: z.coerce.number().int().positive().optional(),
			difficulty_id: z.coerce.number().int().positive().optional(),
		}),
	),
	async (c) => {
		// クエリパラメータの処理
		const { category_id: queryCategoryId, difficulty_id: queryDifficultyId } =
			c.req.valid("query");

		// カテゴリの取得
		let categoryRecord: CategoryRecord | null = null;
		if (queryCategoryId) {
			categoryRecord = await getCategoryById(c.env.DB, queryCategoryId);
		} else {
			categoryRecord = await getRandomCategory(c.env.DB);
		}
		if (!categoryRecord) {
			return c.json({ error: "Category not found." }, 404);
		}

		// 難易度の取得
		let difficultyRecord: DifficultyRecord | null = null;
		if (queryDifficultyId) {
			difficultyRecord = await getDifficultyById(c.env.DB, queryDifficultyId);
		} else {
			difficultyRecord = await getRandomDifficulty(c.env.DB);
		}
		if (!difficultyRecord) {
			return c.json({ error: "Difficulty not found." }, 404);
		}

		// サブカテゴリーの取得
		const subcategoryRecords = await getSubcategoriesByCategoryId(
			c.env.DB,
			categoryRecord.id,
		);
		if (subcategoryRecords.length === 0) {
			return c.json({ error: "Subcategory not found." }, 404);
		}

		// 単語の取得
		subcategoryRecords.sort(() => Math.random() - 0.5); // ランダムに並び替え
		let subcategoryRecord: SubcategoryRecord | null = null;
		let wordRecords: WordRecord[] = [];
		for (const record of subcategoryRecords) {
			wordRecords = await getWords(c.env.DB, record.id, difficultyRecord.id);
			if (wordRecords.length > 0) {
				subcategoryRecord = record;
				break;
			}
		}
		if (!subcategoryRecord) {
			return c.json(
				{ error: "No words found for the selected category and difficulty." },
				404,
			);
		}

		return c.json(wordRecords);
	},
);

export default app;
