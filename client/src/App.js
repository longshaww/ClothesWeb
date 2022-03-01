import "./App.css";
import Home from "./features/Home/pages/home";
import Collections from "./features/Collections/pages/collections";
import Tops from "./features/Tops/pages/tops";
import Bottoms from "./features/Collections/pages/bottoms";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import TopsDetail from "./features/Tops/pages/tops.detail";

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
						<Route path="bottoms">
							<Route index element={<Bottoms />}></Route>
							{/* <Route path=":id" element={<TopsDetail />} /> */}
						</Route>
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
