import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import App from "./App";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider forcedTheme="dark">
			<App />
		</Provider>
	</React.StrictMode>,
);
