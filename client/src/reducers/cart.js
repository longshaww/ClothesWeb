import { SET_CART_COUNT, SET_CART_STORE } from "../constants/constants";

const initialState = {
	cartCount: 0,
	cartStore: {},
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
		default:
			return { ...state };
	}
};
