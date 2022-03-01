import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const FETCHED_DATA_TOPS = "FETCHED_DATA_TOPS";
const ADD_TOPS = "ADD_TOPS";

const setTops = (data) => ({
	type: FETCHED_DATA_TOPS,
	payload: data,
});

const addedTops = (data) => ({
	type: ADD_TOPS,
	payload: data,
});

const fetchTops = () => async (dispatch) => {
	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(process.env.REACT_APP_API_URL);
			const data = await res.data;
			dispatch(setTops(data));
		}
		fetchData();
	}, [dispatch]);
};

const postTop = (room) => async (dispatch) => {
	const res = await axios.post(`${process.env.REACT_APP_ROOM_API}`, room);
	console.log(res);
	await MySwal.fire({
		title: <p>Đã thêm phòng mới</p>,
		icon: "success",
	});
	dispatch(addedTops(res.data));
};

export { addedTops, fetchTops, postTop };
