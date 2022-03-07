import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

import {
	FETCHED_COLLECTIONS,
	ADD_COLLECTIONS,
	SET_SEARCH_INPUT,
} from "../constants/constants";
import { setPage } from "./pagination";

const MySwal = withReactContent(Swal);

const setCollections = (data) => ({
	type: FETCHED_COLLECTIONS,
	payload: data,
});

const addProduct = (data) => ({
	type: ADD_COLLECTIONS,
	payload: data,
});

const setSearchInput = (data) => ({
	type: SET_SEARCH_INPUT,
	payload: data,
});

const fetchCollections = (endpoint, filter) => async (dispatch) => {
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}${endpoint}`
				);
				const data = await res.data;
				dispatch(setCollections(data));
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [dispatch, filter]);
};

const postProduct = (room) => async (dispatch) => {
	const res = await axios.post(`${process.env.REACT_APP_ROOM_API}`, room);
	console.log(res);
	await MySwal.fire({
		title: <p>Đã thêm phòng mới</p>,
		icon: "success",
	});
	dispatch(addProduct(res.data));
};

export {
	addProduct,
	fetchCollections,
	postProduct,
	setCollections,
	setSearchInput,
};
