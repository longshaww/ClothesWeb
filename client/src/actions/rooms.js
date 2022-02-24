import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FETCHED_DATA_ROOM_HOME = "FETCHED_DATA_ROOM_HOME";
const ADD_ROOM = "ADD_ROOM";

export const setRooms = (data) => ({
	type: FETCHED_DATA_ROOM_HOME,
	payload: data,
});

export const addedRoom = (data) => ({
	type: ADD_ROOM,
	payload: data,
});

export const fetchRooms = () => async (dispatch) => {
	const res = await axios.get(`${process.env.REACT_APP_ROOM_API}`);
	const data = await res.data;
	dispatch(
		setRooms(
			data.sort((a, b) => {
				return a.room_id - b.room_id;
			})
		)
	);
};

export const postRoom = (room) => async (dispatch) => {
	const res = await axios.post(`${process.env.REACT_APP_ROOM_API}`, room);
	console.log(res);
	await MySwal.fire({
		title: <p>Đã thêm phòng mới</p>,
		icon: "success",
	});
	dispatch(addedRoom(res.data));
};
