import { combineReducers } from "redux";
import { collectionsReducer } from "./collections.js";
import { paginationReducer } from "./pagination.js";

const rootReducer = combineReducers({
	collections: collectionsReducer,
	pagination: paginationReducer,
});

export default rootReducer;
