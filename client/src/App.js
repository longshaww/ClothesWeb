import "./App.css";
import Home from "./features/Home/pages/home";
import Collections from "./features/Collections/pages/collections";
import Tops from "./features/Tops/pages/tops";
import Bottoms from "./features/Bottoms/pages/bottoms";
import Outerwears from "./features/Outerwears/pages/outerwears";
import Accessories from "./features/Accessories/pages/accessories";
import Sale from "./features/Sale/pages/sale";
import Layout from "./layouts/layout";
import Detail from "./features/Tops/pages/tops.detail";
import CollectionsLayout from "./features/Collections/pages/collections.layout";
import NewArrivals from "./features/New-Arrivals/pages/new.arrivals";
import Search from "./features/Search/search"
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route
						path="collections"
						element={<CollectionsLayout />}
					>
						<Route index element={<Collections />} />
						<Route path="tops">
							<Route index element={<Tops />}></Route>
						</Route>
						<Route path="bottoms">
							<Route index element={<Bottoms />}></Route>
						</Route>
						<Route path="outerwears">
							<Route
								index
								element={<Outerwears />}
							></Route>
						</Route>
						<Route path="accessories">
							<Route
								index
								element={<Accessories />}
							></Route>
						</Route>
						<Route path="sale">
							<Route index element={<Sale />}></Route>
						</Route>
						<Route path="new-arrivals">
							<Route
								index
								element={<NewArrivals />}
							></Route>
						</Route>
					</Route>
					<Route path="product">
						<Route
							path=":id"
							element={<Detail></Detail>}
						></Route>
					</Route>
					<Route path="/search" >
							<Route index element={<Search />}></Route>
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
