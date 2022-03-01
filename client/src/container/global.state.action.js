import { connect } from "react-redux";
import { fetchCollections } from "../actions/tops";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: () => dispatch(fetchCollections()),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
