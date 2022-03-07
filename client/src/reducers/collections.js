import {
	FETCHED_COLLECTIONS,
	ADD_COLLECTIONS,
	SET_SEARCH_INPUT,
} from "../constants/constants";

const initialState = {
	list: [],
	listSearch: [],
	searchInput: { q: "" },
};

export const collectionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHED_COLLECTIONS:
			return {
				...state,
				list: action.payload,
			};
		case ADD_COLLECTIONS:
			const newList = [...state.list];
			newList.push(action.payload);
			return {
				...state,
				list: newList,
			};
		case SET_SEARCH_INPUT:
			const newObj = { ...state.searchInput };
			newObj.q = action.payload;
			return {
				...state,
				searchInput: newObj,
			};
		default:
			return { ...state };
	}
};
