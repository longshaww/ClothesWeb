import globalStateAndAction from "../../container/global.state.action";
import renderDependOnCollection from "../../components/productCard/product.card";
// Phú PLAY CODE
function Search({ listSearch, searchCollections }) {
	searchCollections();
	return <div id="search">{renderDependOnCollection(listSearch)}</div>;
}

export default globalStateAndAction(Search);
