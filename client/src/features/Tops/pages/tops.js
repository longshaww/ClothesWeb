import RenderDependOnCollection from "../../../components/productCard/product.card";
import { topsEndpoint } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function Tops({ collections, pagination }) {
	return (
		<div id="tops">
			{RenderDependOnCollection(
				collections,
				topsEndpoint,
				null,
				pagination
			)}
		</div>
	);
}
export default globalStateAndAction(Tops);
