import {
	SET_CART_COUNT,
	SET_CART_STORE,
	SET_PRODUCT_CART_PRICE,
	SET_CART_TOTAL_PRICE,
	SET_TOTAL,
} from "../constants/constants";

const initialState = {
	cartCount: 0,
	cartStore: {},
	cartProductPrice: 0,
	cartTotalPrice: 0,
	total: 0,
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CART_COUNT:
			return {
				...state,
				cartCount: action.payload,
			};
		case SET_CART_STORE:
			return {
				...state,
				cartStore: action.payload,
			};
		case SET_PRODUCT_CART_PRICE:
			return {
				...state,
				cartProductPrice: action.payload,
			};
		case SET_CART_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice: action.payload,
			};
		case SET_TOTAL:
			return {
				...state,
				total: action.payload,
			};
		default:
			return { ...state };
	}
};
