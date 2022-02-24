import Home from "./pages/home/home";
import Collection from "./pages/collections/collections";
import { Route } from "react-router-dom";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/collections",
		component: Collection,
	},
];

function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			render={(props) => (
				// pass the sub-routes down to keep nesting
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
}

export { routes, RouteWithSubRoutes };
