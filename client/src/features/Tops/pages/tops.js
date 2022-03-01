import renderDependOnCollection from "../../../components/productCard/product.card";
import { topsCollection } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function Tops({ collections, fetchCollections }) {
	if (!collections.length) {
		fetchCollections();
	}
	return (
		<div id="tops">
			{renderDependOnCollection(collections, topsCollection)}
		</div>
	);
}
export default globalStateAndAction(Tops);
