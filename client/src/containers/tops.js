import { connect } from "react-redux";
import Tops from "../pages/collections/tops";
import { setTops, addedTops } from "../actions/tops";
import { fetchTops } from "../actions/tops";

const mapStateToProps = (state) => {
	return {
		tops: state.TopsCollection.tops,
	};
};

const mapActionToProps = (dispatch) => ({
	setTops: (data) => dispatch(setTops(data)),
	fetchTops: () => dispatch(fetchTops()),
	addedTops: (data) => dispatch(addedTops(data)),
});

export default connect(mapStateToProps, mapActionToProps)(Tops);
