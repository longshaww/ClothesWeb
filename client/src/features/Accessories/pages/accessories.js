import globalStateAndAction from "../../../container/global.state.action";
import renderDependOnCollection from "../../../components/productCard/product.card";
import { accessoriesEndpoint } from "../../../constants/constants";

function Accessories({ collections, pagination }) {
	return (
		<div id="accessories">
			{renderDependOnCollection(
				collections,
				accessoriesEndpoint,
				null,
				pagination
			)}
		</div>
	);
}

export default globalStateAndAction(Accessories);
