import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import sitemapPlugin from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		sitemapPlugin({
			hostname: "https://it-word-wolf.nrysk.dev",
			robots: [
				{
					userAgent: "*",
					allow: "/",
				},
			],
		}),
	],
});
