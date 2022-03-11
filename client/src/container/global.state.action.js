import { connect } from "react-redux";
import { fetchCollections, setSearchInput } from "../actions/collections";
import { setCart } from "../actions/cart";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			pagination: state.pagination.page,
			cartCount: state.cart.cartCount,
			cartStore: state.cart.cartStore,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		setCart: (count, store) => dispatch(setCart(count, store)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
