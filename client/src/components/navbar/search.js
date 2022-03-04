import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

PostFilterForm.propTypes = {
	onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
	onSubmit: null,
};

export default function PostFilterForm(props) {
	const { onSubmit } = props;
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	function handleSearchChange(e) {
		const value = e.target.value;
		setSearch(value);
	}
	function handleSearchKeyUp(e) {
		const value = e.target.value;
		if (e.keyCode === 13) {
			if (!value) return;
			const formValues = { search: value };
			onSubmit(formValues);
			navigate("/search");
		}
	}
	return (
		<input
			className="form-control"
			placeholder="Search"
			value={search}
			onKeyUp={handleSearchKeyUp}
			onChange={handleSearchChange}
		></input>
	);
}
