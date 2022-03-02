import RenderDependOnCollection from "../../../components/productCard/product.card";
import { topsEndpoint } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function Tops({ collections }) {
	return (
		<div id="tops">
			{RenderDependOnCollection(collections, topsEndpoint)}
		</div>
	);
}
export default globalStateAndAction(Tops);
