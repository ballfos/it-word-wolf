import { GoogleGenAI, Type } from "@google/genai";

function generatePrompt(categoryName: string, difficulty: string): string {
	return `
	${categoryName}の分野に属するサブ分野を選んでください．
	その後，選んだサブ分野に関する用語を4つ挙げてください．
	難易度は${difficulty}です．
	`;
}

const generationConfig = {
	temperature: 2.0,
	responseMimeType: "application/json",
	responseJsonSchema: {
		type: Type.OBJECT,
		properties: {
			category: {
				type: Type.STRING,
			},
			subCategory: {
				type: Type.STRING,
				description: "選択されたサブカテゴリーの名前（日本語）",
			},
			difficulty: {
				type: Type.STRING,
			},
			words: {
				type: Type.ARRAY,
				items: {
					type: Type.OBJECT,
					properties: {
						word: {
							type: Type.STRING,
							description: "単語の名前（日本語）",
						},
						english: {
							type: Type.STRING,
							description: "単語の名前（英語）",
						},
						explanation: {
							type: Type.STRING,
							description: "単語の説明（日本語）",
						},
					},
				},
			},
		},
	},
};

export type ContentSchema = {
	category: string;
	subCategory: string;
	difficulty: string;
	words: {
		word: string;
		english: string;
		description: string;
	}[];
};

export async function generateContent(
	apiKey: string,
	categoryName: string,
	difficulty: string,
): Promise<ContentSchema> {
	const ai = new GoogleGenAI({
		apiKey: apiKey,
	});
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: generatePrompt(categoryName, difficulty),
		config: generationConfig,
	});
	if (!response || !response.text) {
		throw new Error("No response from Gemini API");
	}
	return JSON.parse(response.text);
}
