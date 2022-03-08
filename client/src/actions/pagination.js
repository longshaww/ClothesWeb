import { SET_PAGE } from "../constants/constants";
import axiosMethod from "../middlewares/axios";
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
				const data = await axiosMethod(
					`${endpoint}?page=${pageSelect}`,
					"get"
				);
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
