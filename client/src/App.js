import "./App.css";
import Home from "./pages/home/home";
import Collections from "./pages/collections/collections";
import Tops from "./pages/collections/tops";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import TopsDetail from "./pages/collections/tops.detail";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="collections" element={<Collections />}>
						<Route path="tops">
							<Route index element={<Tops />}></Route>
							<Route path=":id" element={<TopsDetail />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
