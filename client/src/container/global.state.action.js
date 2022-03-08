import { connect } from "react-redux";
import { fetchCollections, setSearchInput } from "../actions/collections";
import { setCartCount } from "../actions/cart";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			searchInput: state.collections.searchInput,
			pagination: state.pagination.page,
			cartCount: state.cart.cartCount,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		setSearchInput: (searchInput) =>
			dispatch(setSearchInput(searchInput)),
		setCartCount: (data) => dispatch(setCartCount(data)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
