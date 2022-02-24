import { combineReducers } from "redux";
import { getRoomHomePageReducer as RoomHomePage } from "./rooms.js";
import { loadingState } from "./loading.js";

const rootReducer = combineReducers({
	RoomHomePage,
	loadingState,
});

export default rootReducer;
