import { connect } from "react-redux";
import Card from "../Components/rooms/card";
import { setRooms, addedRoom } from "../actions/rooms";
import { fetchRooms } from "../actions/rooms";

const mapStateToProps = (state) => {
	return {
		rooms: state.RoomHomePage.rooms,
	};
};

const mapActionToProps = (dispatch) => ({
	setRooms: (data) => dispatch(setRooms(data)),
	fetchRooms: () => dispatch(fetchRooms()),
	addedRoom: (data) => dispatch(addedRoom(data)),
});

export default connect(mapStateToProps, mapActionToProps)(Card);
