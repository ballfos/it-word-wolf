type GameState = {
	// 状態
	players: {
		name: string;
		isWolf: boolean;
	}[];
	levelRange: [number, number];
	withExplanation: boolean;
	categories: { id: number; name: string }[];

	// アクション
	addPlayer: () => void;
	removePlayer: () => void;
	updatePlayerName: (index: number, name: string) => void;
	setLevelRange: (range: [number, number]) => void;
	setWithExplanation: (withExplanation: boolean) => void;
};
