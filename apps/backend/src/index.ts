import { Hono } from "hono";
import type { Bindings } from "./bindings";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import {
	addHistory,
	type CategoryRecord,
	type DifficultyRecord,
	getCategories,
	getCategoryById,
	getDifficulties,
	getDifficultyByLevel,
	getRandomCategory,
	getRandomDifficulty,
	getRandomHistoryByCategoryAndDifficulty,
} from "./services/database";
import { generateContent } from "./services/gemini";
import { cors } from "hono/cors";

const geminiApiCallCount = "gemini_call_count";

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
			difficulty_level: z.coerce.number().int().positive().optional(),
		}),
	),
	async (c) => {
		// クエリパラメータの処理
		const {
			category_id: queryCategoryId,
			difficulty_level: queryDifficultyLevel,
		} = c.req.valid("query");

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
		if (queryDifficultyLevel) {
			difficultyRecord = await getDifficultyByLevel(
				c.env.DB,
				queryDifficultyLevel,
			);
		} else {
			difficultyRecord = await getRandomDifficulty(c.env.DB);
		}
		if (!difficultyRecord) {
			return c.json({ error: "Difficulty not found." }, 404);
		}

		console.log(
			`Category: ${categoryRecord.name}, Difficulty: ${difficultyRecord.name}`,
		);

		// GeminiAPIの使用上限を確認
		const callCount = Number(await c.env.IWW_KV.get(geminiApiCallCount)) || 0;
		c.env.IWW_KV.put(geminiApiCallCount, String(callCount + 1));

		// 上限に到達している場合はデータベースからランダムに返答
		if (callCount >= Number(c.env.GEMINI_CALL_LIMIT)) {
			const historyRecord = await getRandomHistoryByCategoryAndDifficulty(
				c.env.DB,
				categoryRecord.id,
				difficultyRecord.id,
			);
			if (historyRecord) {
				return c.json({
					category: categoryRecord.name,
					subCategory: historyRecord.sub_category,
					difficulty: difficultyRecord.name,
					words: JSON.parse(historyRecord.words),
				});
			} else {
				return c.json({ error: "No history found." }, 404);
			}
		}

		// Gemini APIを使用してコンテンツを生成
		try {
			const content = await generateContent(
				c.env.GEMINI_API_KEY,
				categoryRecord.name,
				difficultyRecord.name,
			);
			await addHistory(
				c.env.DB,
				categoryRecord.id,
				content.subCategory,
				difficultyRecord.id,
				JSON.stringify(content.words),
			);
			return c.json(content);
		} catch (error) {
			console.error("Error generating content:", error);
			return c.json({ error: "Failed to generate content." }, 500);
		}
	},
);

export default {
	fetch: app.fetch,
	scheduled: async (
		event: ScheduledEvent,
		env: Bindings,
		ctx: ExecutionContext,
	) => {
		await env.IWW_KV.put(geminiApiCallCount, "0");
	},
};
