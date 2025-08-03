const CATEGORY_ID = process.argv[2];
const API_BASE_URL = process.argv[3];

async function main() {
	for (let i = 1; i <= 5; i++) {
		const url = `${API_BASE_URL}/words/random?category_id=${CATEGORY_ID}&difficulty_level=${i}`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log(`Words for difficulty level ${i}:`, data);
		} catch (error) {
			console.error("Error fetching words:", error);
		}
	}
}

main();
