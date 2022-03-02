import { connect } from "react-redux";
import { fetchCollections, searchCollections } from "../actions/collections";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			result: state.collections.result,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		searchCollections: (data, value) =>
			dispatch(searchCollections(data, value)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
