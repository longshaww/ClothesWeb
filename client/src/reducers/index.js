import { combineReducers } from "redux";
import { collectionsReducer } from "./collections.js";
import { paginationReducer } from "./pagination.js";
import { cartReducer } from "./cart";
const rootReducer = combineReducers({
	collections: collectionsReducer,
	pagination: paginationReducer,
	cart: cartReducer,
});

export default rootReducer;
