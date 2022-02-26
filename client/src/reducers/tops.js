const initialState = {
	tops: [],
};

const FETCHED_DATA_TOPS = "FETCHED_DATA_TOPS";
const ADD_TOPS = "ADD_TOPS";

export const TopsCollection = (state = initialState, action) => {
	switch (action.type) {
		case FETCHED_DATA_TOPS:
			return {
				...state,
				tops: action.payload,
			};
		case ADD_TOPS:
			const newList = [...state.tops];
			newList.push(action.payload);
			return {
				...state,
				tops: newList,
			};
		default:
			return state;
	}
};
