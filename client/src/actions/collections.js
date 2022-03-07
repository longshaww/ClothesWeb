import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import {
	FETCHED_COLLECTIONS,
	ADD_COLLECTIONS,
	SET_SEARCH_INPUT,
} from "../constants/constants";

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

const fetchCollections = (endpoint) => async (dispatch) => {
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
	}, [dispatch]);
};

const filterCollections = () => async (dispatch) => {
	const qSelect = useSelector((state) => state.collections.searchInput);
	const [searchParam, setSearchParam] = useSearchParams();
	const q = queryString.stringify(qSelect);
	const res = useRef("");
	useEffect(() => {
		async function fetchData() {
			try {
				if (q === "q=") {
					res.current = await axios.get(
						`${process.env.REACT_APP_API_URL}collections`
					);
				} else {
					res.current = await axios.get(
						`${process.env.REACT_APP_API_URL}search?${q}`
					);
				}
				const data = await res.current.data;
				dispatch(setCollections(data));
				setSearchParam(qSelect);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [dispatch, q, setSearchParam, qSelect]);
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
	filterCollections,
};
