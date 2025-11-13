import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import sitemapPlugin from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";

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
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "エンジニアワードウルフ",
				icons: [
					{
						src: "/logo-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/logo-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				start_url: "/",
				display: "standalone",
				background_color: "#291c50",
				theme_color: "#9333ea",
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,webmanifest}"],
			},
		}),
	],
});
