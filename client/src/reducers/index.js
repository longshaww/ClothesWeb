import { combineReducers } from "redux";
import { collectionsReducer } from "./collections.js";
import { paginationReducer } from "./pagination.js";
import { cartReducer } from "./cart";
import { authReducer } from "./auth";
import { paymentReducer } from "./payment.info.js";
const rootReducer = combineReducers({
	collections: collectionsReducer,
	pagination: paginationReducer,
	cart: cartReducer,
	user: authReducer,
	payment: paymentReducer,
});

export default rootReducer;
