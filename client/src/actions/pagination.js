import { SET_PAGE } from "../constants/constants";

import axios from "axios";
import { useEffect } from "react";
import { setCollections } from "./collections";

const setPage = (data) => ({
	type: SET_PAGE,
	payload: data,
});

const pagination = (endpoint, page) => async (dispatch) => {
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}${endpoint}?page=${page}`
				);
				const data = await res.data;
				if (!data.length) {
					dispatch(setPage(page - 1));
				}
				dispatch(setCollections(data));
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [dispatch, page]);
};

export { setPage, pagination };
