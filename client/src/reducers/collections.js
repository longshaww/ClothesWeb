import {
	FETCHED_COLLECTIONS,
	ADD_COLLECTIONS,
	SET_LIST_SEARCH,
	SET_SEARCH_INPUT,
} from "../constants/constants";

const initialState = {
	list: [],
	listSearch: [],
	searchInput: "",
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
		case SET_LIST_SEARCH:
			return {
				...state,
				listSearch: action.payload,
			};
		case SET_SEARCH_INPUT:
			return {
				...state,
				searchInput: action.payload,
			};
		default:
			return { ...state };
	}
};
