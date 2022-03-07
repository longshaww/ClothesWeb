import globalStateAndAction from "../../container/global.state.action";
import renderDependOnCollection from "../../components/productCard/product.card";
import queryString from "query-string";

// Phú PLAY CODE
function Search({ collections, searchInput }) {
	const paramsString = queryString.stringify(searchInput);
	return (
		<div id="search">
			{renderDependOnCollection(
				collections,
				`search?${paramsString}`,
				searchInput
			)}
		</div>
	);
}

export default globalStateAndAction(Search);
