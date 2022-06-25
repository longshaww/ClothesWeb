import {
	SET_CART_COUNT,
	SET_CART_STORE,
	SET_PRODUCT_CART_PRICE,
	SET_CART_TOTAL_PRICE,
	SET_TOTAL,
} from "../constants/constants";

const setCartCount = (data) => ({
	type: SET_CART_COUNT,
	payload: data,
});

const setCartStore = (data) => ({
	type: SET_CART_STORE,
	payload: data,
});

const setProductCartPrice = (price) => ({
	type: SET_PRODUCT_CART_PRICE,
	payload: price,
});

const setCartTotalPrice = (price) => ({
	type: SET_CART_TOTAL_PRICE,
	payload: price,
});

const setTotal = (price) => ({
	type: SET_TOTAL,
	payload: price,
});

const setCart = (count, store, totalPrice) => (dispatch) => {
	dispatch(setCartCount(count));
	dispatch(setCartStore(store));
	dispatch(setCartTotalPrice(totalPrice));
};

export { setCart, setProductCartPrice, setTotal };
