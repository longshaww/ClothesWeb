const initialState = {
	list: [],
};

const FETCHED_COLLECTIONS = "FETCHED_COLLECTIONS";
const ADD_COLLECTIONS = "FETCHED_COLLECTIONS";

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
		default:
			return { ...state };
	}
};
