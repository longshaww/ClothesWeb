import { SET_CUSTOMER, SET_METHOD } from "../constants/constants";

const initialState = {
	customer: {},
	method: "",
};

export const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CUSTOMER:
			return {
				...state,
				customer: action.payload,
			};
		case SET_METHOD:
			return {
				...state,
				method: action.payload,
			};
		default:
			return { ...state };
	}
};
