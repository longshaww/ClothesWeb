import renderDependOnCollection from "../../../components/productCard/product.card";
import { newArrivalEndpoint } from "../../../constants/constants";
import globalStateAndAction from "../../../container/global.state.action";

function NewArrivals({ collections }) {
	return (
		<div className="new-arrivals">
			{renderDependOnCollection(collections, newArrivalEndpoint)}
		</div>
	);
}

export default globalStateAndAction(NewArrivals);
