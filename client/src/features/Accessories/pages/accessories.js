import globalStateAndAction from "../../../container/global.state.action";
import renderDependOnCollection from "../../../components/productCard/product.card";
import { accessoriesCollection } from "../../../constants/constants";

function Accessories({ collections, fetchCollections }) {
	if (!collections.length) {
		fetchCollections();
	}
	return (
		<div id="accessories">
			{renderDependOnCollection(collections, accessoriesCollection)}
		</div>
	);
}

export default globalStateAndAction(Accessories);
