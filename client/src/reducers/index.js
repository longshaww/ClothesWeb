import { combineReducers } from "redux";
import { TopsCollection } from "./tops.js";
import { loadingState } from "./loading.js";

const rootReducer = combineReducers({
	TopsCollection,
	loadingState,
});

export default rootReducer;
