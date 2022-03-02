import globalStateAndAction from "../../../container/global.state.action";
import renderDependOnCollection from "../../../components/productCard/product.card";
import { accessoriesEndpoint } from "../../../constants/constants";

function Accessories({ collections }) {
	console.log(collections);
	return (
		<div id="accessories">
			{renderDependOnCollection(collections, accessoriesEndpoint)}
		</div>
	);
}

export default globalStateAndAction(Accessories);
