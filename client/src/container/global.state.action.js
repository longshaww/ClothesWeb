import { connect } from "react-redux";
import { fetchCollections } from "../actions/collections";
import { setCart } from "../actions/cart";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			pagination: state.pagination.page,
			cart: state.cart,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		setCart: (count, store, totalPrice) =>
			dispatch(setCart(count, store, totalPrice)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
