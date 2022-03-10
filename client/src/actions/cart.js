import { SET_CART_COUNT, SET_CART_STORE } from "../constants/constants";

const setCartCount = (data) => ({
	type: SET_CART_COUNT,
	payload: data,
});

const setCartStore = (data) => ({
	type: SET_CART_STORE,
	payload: data,
});

const setCart = (count, store) => (dispatch) => {
	dispatch(setCartStore(store));
	dispatch(setCartCount(count));
};

export { setCart };
