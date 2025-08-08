import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Assignment from "./pages/Assignment";
import Confirmation from "./pages/Confirmation";
import Disscussion from "./pages/Disscussion";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/assignment" element={<Assignment />} />
				<Route path="/confirmation" element={<Confirmation />} />
				<Route path="/disscussion" element={<Disscussion />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</Router>
	);
}

export default App;
