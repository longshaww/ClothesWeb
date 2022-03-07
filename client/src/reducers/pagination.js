import { SET_PAGE } from "../constants/constants";

const initialState = {
	page: 1,
};

export const paginationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PAGE:
			return {
				...state,
				page: action.payload,
			};
		default:
			return { ...state };
	}
};
