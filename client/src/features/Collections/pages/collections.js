import renderDependOnCollection from "../../../components/productCard/product.card";
import globalStateAndAction from "../../../container/global.state.action";
import { collectionsEndpoint } from "../../../constants/constants";
import { useEffect } from "react";

function Collections({ collections }) {
	useEffect(() => {
		localStorage.removeItem("voucher");
	}, []);
	return (
		<div id="collections">
			{renderDependOnCollection(collections, collectionsEndpoint)}
		</div>
	);
}

export default globalStateAndAction(Collections);
