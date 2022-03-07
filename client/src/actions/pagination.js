import { SET_PAGE } from "../constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { setCollections } from "./collections";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const setPage = (data) => ({
	type: SET_PAGE,
	payload: data,
});

const pagination = (endpoint) => async (dispatch) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageSelect = useSelector((state) => state.pagination.page);
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}${endpoint}?page=${pageSelect}`
				);
				const data = await res.data;
				if (!data.length) {
					dispatch(setPage(1));
				}
				dispatch(setCollections(data));
				setSearchParams({ page: pageSelect });
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [dispatch, setSearchParams, pageSelect]);
};

export { setPage, pagination };
