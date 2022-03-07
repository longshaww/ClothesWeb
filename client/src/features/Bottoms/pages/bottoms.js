import renderDependOnCollection from "../../../components/productCard/product.card";
import { bottomsEndpoint } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function Bottoms({ collections, pagination }) {
	return (
		<div id="bottoms">
			{renderDependOnCollection(
				collections,
				bottomsEndpoint,
				null,
				pagination
			)}
		</div>
	);
}

export default globalStateAndAction(Bottoms);
