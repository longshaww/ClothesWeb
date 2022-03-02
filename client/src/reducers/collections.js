const initialState = {
	list: [],
	result: [],
};

const FETCHED_COLLECTIONS = "FETCHED_COLLECTIONS";
const ADD_COLLECTIONS = "FETCHED_COLLECTIONS";
const SEARCH_PRODUCT = "SEARCH_PRODUCT";

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
		case SEARCH_PRODUCT:
			return {
				...state,
				result: action.payload,
			};
		default:
			return { ...state };
	}
};
