import { SET_CART_COUNT } from "../constants/constants";

export const setCartCount = (data) => ({
	type: SET_CART_COUNT,
	payload: data,
});
