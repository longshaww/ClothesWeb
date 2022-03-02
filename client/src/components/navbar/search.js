import { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
	onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
	onSubmit: null,
};

export default function PostFilterForm(props) {
	const { onSubmit } = props;
	const [search, setSearch] = useState("");
	const typingTimeoutRef = useRef(null);

	function handleSearchChange(e) {
		const value = e.target.value;
		setSearch(value);
		if (!onSubmit) return;

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			const formValues = { search: value };
			onSubmit(formValues);
		}, 500);
	}
	return (
		<input
			className="form-control"
			placeholder="Search"
			value={search}
			onChange={handleSearchChange}
		></input>
	);
}
