import axios from "axios";

export default async function getData(endpoint, method, pageSelect, filter) {
	const res = await axios({
		method: method,
		url: `${process.env.REACT_APP_API_URL}${endpoint ? endpoint : ""}${
			pageSelect ? `?page=${pageSelect}` : ""
		}${filter ? `search?${filter}` : ""}`,
		withCredentials: true,
	});
	const data = await res.data;
	return data;
}
