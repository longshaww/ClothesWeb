const initialState = {
	list: [],
};

const FETCHED_DATA_TOPS = "FETCHED_DATA_TOPS";
const ADD_TOPS = "ADD_TOPS";

export const topsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHED_DATA_TOPS:
			return {
				...state,
				list: action.payload,
			};
		case ADD_TOPS:
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
