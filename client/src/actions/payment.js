import { SET_CUSTOMER, SET_METHOD } from "../constants/constants";

const setCustomer = (data) => ({
	type: SET_CUSTOMER,
	payload: data,
});

const setMethod = (data) => ({
	type: SET_METHOD,
	payload: data,
});

export { setCustomer, setMethod };
