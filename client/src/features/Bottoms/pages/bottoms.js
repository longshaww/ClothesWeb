import renderDependOnCollection from "../../../components/productCard/product.card";
import { bottomsCollection } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function Bottoms({ collections, fetchCollections }) {
	if (!collections.length) {
		fetchCollections();
	}
	return (
		<div id="bottoms">
			{renderDependOnCollection(collections, bottomsCollection)}
		</div>
	);
}

export default globalStateAndAction(Bottoms);
