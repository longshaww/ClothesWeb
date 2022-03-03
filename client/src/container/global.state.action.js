import { connect } from "react-redux";
import {
	fetchCollections,
	searchCollections,
	searchInputHandleChange,
} from "../actions/collections";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			listSearch: state.collections.listSearch,
			searchInput: state.collections.searchInput,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		searchCollections: (listSearch) =>
			dispatch(searchCollections(listSearch)),
		searchInputHandleChange: (e) => dispatch(searchInputHandleChange(e)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
