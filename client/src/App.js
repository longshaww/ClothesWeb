import "./App.css";
import Home from "./pages/home/home";
import Collections from "./pages/collections/collections";
import Tops from "./pages/collections/tops";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="collections" element={<Collections />}>
						<Route path="tops" element={<Tops />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
