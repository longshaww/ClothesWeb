import { SET_CART_COUNT } from "../constants/constants";

const initialState = {
	cartCount: 0,
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CART_COUNT:
			return {
				...state,
				cartCount: action.payload,
			};
		default:
			return { ...state };
	}
};
