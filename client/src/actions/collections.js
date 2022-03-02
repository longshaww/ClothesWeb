import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const FETCHED_COLLECTIONS = "FETCHED_COLLECTIONS";
const ADD_COLLECTIONS = "FETCHED_COLLECTIONS";
const SEARCH_PRODUCT = "SEARCH_PRODUCT";

const setCollections = (data) => ({
	type: FETCHED_COLLECTIONS,
	payload: data,
});

const setFilter = (data) => ({
	type: SEARCH_PRODUCT,
	payload: data,
});

const addProduct = (data) => ({
	type: ADD_COLLECTIONS,
	payload: data,
});

const searchCollections = (data, value) => async (dispatch) => {
	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}collections`
			);
			const data = await res.data;
			dispatch(setFilter(data));
		}
		fetchData();
	}, [dispatch]);
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
};
