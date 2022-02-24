const initialState = {
	rooms: [],
};

const FETCHED_DATA_ROOM_HOME = "FETCHED_DATA_ROOM_HOME";
const ADD_ROOM = "ADD_ROOM";

export const getRoomHomePageReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHED_DATA_ROOM_HOME:
			return {
				...state,
				rooms: action.payload,
			};
		case ADD_ROOM:
			const newList = [...state.rooms];
			newList.push(action.payload);
			return {
				...state,
				rooms: newList,
			};
		default:
			return state;
	}
};
