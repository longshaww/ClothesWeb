import Tops from "../pages/collections/tops";
import { connect } from "react-redux";
import { setTops, addedTops } from "../actions/tops";
import { fetchTops } from "../actions/tops";
import TopsList from "../features/components/tops/tops";

const mapStateToProps = (state) => {
	return {
		tops: state.tops.list,
	};
};

const mapActionToProps = (dispatch) => ({
	setTops: (data) => dispatch(setTops(data)),
	fetchTops: () => dispatch(fetchTops()),
	addedTops: (data) => dispatch(addedTops(data)),
});

export default connect(mapStateToProps, mapActionToProps)(TopsList);
