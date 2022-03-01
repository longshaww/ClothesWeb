import renderDependOnCollection from "../../../components/productCard/product.card";
import globalStateAndAction from "../../../container/global.state.action";

function Collections({ collections, fetchCollections }) {
	if (!collections.length) {
		fetchCollections();
	}
	return <div id="collections">{renderDependOnCollection(collections)}</div>;
}

export default globalStateAndAction(Collections);
