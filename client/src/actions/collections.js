import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
	FETCHED_COLLECTIONS,
	ADD_COLLECTIONS,
	SET_LIST_SEARCH,
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

const setListSearch = (data) => ({
	type: SET_LIST_SEARCH,
	payload: data,
});

const setSearchInput = (data) => ({
	type: SET_SEARCH_INPUT,
	payload: data,
});

const searchInputHandleChange = (e) => async (dispatch) => {
	const data = e.target.value;
	dispatch(setSearchInput(data));
};

const searchCollections = () => async (dispatch) => {
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const query = searchParams.get("q");
		async function fetchData() {
			const requestAPI = await axios.get(
				`http://localhost:4000/search?q=${query}`
			);
			const data = await requestAPI.data;
			dispatch(setListSearch(data));
		}
		fetchData();
	}, [searchParams, dispatch]);
};

const fetchCollections = (endpoint) => async (dispatch) => {
	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}${endpoint}`
			);
			const data = await res.data;
			dispatch(setCollections(data));
		}
		fetchData();
	}, [dispatch]);
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
	searchCollections,
	setCollections,
	searchInputHandleChange,
};
