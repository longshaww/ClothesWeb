import globalStateAndAction from "../../../container/global.state.action";
import renderDependOnCollection from "../../../components/productCard/product.card";
import { outerwearsEndpoint } from "../../../constants/constants";

function Outerwears({ collections, pagination }) {
	return (
		<div id="outerwears">
			{renderDependOnCollection(
				collections,
				outerwearsEndpoint,
				null,
				pagination
			)}
		</div>
	);
}

export default globalStateAndAction(Outerwears);
