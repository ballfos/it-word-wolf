import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Assignment from "./pages/Assignment";
import Confirmation from "./pages/Confirmation";
import Discussion from "./pages/Discussion";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Configurations from "./pages/Configurations";
import { VStack } from "@chakra-ui/react";
import Header from "./components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

function App() {
	return (
		<VStack minH="100svh" w="full">
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/config" element={<Configurations />} />
					<Route path="/assignment" element={<Assignment />} />
					<Route path="/confirmation" element={<Confirmation />} />
					<Route path="/discussion" element={<Discussion />} />
					<Route path="/result" element={<Result />} />
				</Routes>
			</Router>
			<Toaster />
		</VStack>
	);
}

export default App;
