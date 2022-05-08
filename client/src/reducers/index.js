import { combineReducers } from "redux";
import { collectionsReducer } from "./collections.js";
import { paginationReducer } from "./pagination.js";
import { cartReducer } from "./cart";
import {authReducer} from "./auth";
const rootReducer = combineReducers({
	collections: collectionsReducer,
	pagination: paginationReducer,
	cart: cartReducer,
	user : authReducer,
});

export default rootReducer;
