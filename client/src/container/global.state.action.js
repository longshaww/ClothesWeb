import { connect } from "react-redux";
import { fetchCollections } from "../actions/collections";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
