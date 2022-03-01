import globalStateAndAction from "../../../container/global.state.action";
import renderDependOnCollection from "../../../components/productCard/product.card";
import { outerwearsCollection } from "../../../constants/constants";

function Outerwears({ collections, fetchCollections }) {
	if (!collections.length) {
		fetchCollections();
	}
	return (
		<div id="outerwears">
			{renderDependOnCollection(collections, outerwearsCollection)}
		</div>
	);
}

export default globalStateAndAction(Outerwears);
