import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function PostFilterForm(props) {
	// const { onSubmit } = props;
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
			navigate({
				pathname: "/search",
				search: `?${createSearchParams({
					q: value,
				})}`,
			});
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
