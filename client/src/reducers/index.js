import { combineReducers } from "redux";
import { topsReducer } from "./tops.js";
import { loadingState } from "./loading.js";

const rootReducer = combineReducers({
	tops: topsReducer,
	loadingState,
});

export default rootReducer;
