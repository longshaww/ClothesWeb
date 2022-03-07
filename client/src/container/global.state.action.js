import { connect } from "react-redux";
import { fetchCollections, setSearchInput } from "../actions/collections";

export default function globalStateAndAction(name) {
	const mapStateToProps = (state) => {
		return {
			collections: state.collections.list,
			searchInput: state.collections.searchInput,
			pagination: state.pagination.page,
		};
	};

	const mapActionToProps = (dispatch) => ({
		fetchCollections: (endpoint) => dispatch(fetchCollections(endpoint)),
		setSearchInput: (searchInput) =>
			dispatch(setSearchInput(searchInput)),
	});
	return connect(mapStateToProps, mapActionToProps)(name);
}
