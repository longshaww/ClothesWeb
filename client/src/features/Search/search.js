import globalStateAndAction from "../../container/global.state.action";
import renderDependOnCollection from "../../components/productCard/product.card";
import { searchInput } from "../../constants/constants";

// Phú PLAY CODE
function Search({ collections }) {
	return (
		<div id="search">
			<div className="container">
				{renderDependOnCollection(collections, null, searchInput)}
			</div>
		</div>
	);
}

export default globalStateAndAction(Search);
