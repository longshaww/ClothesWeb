import axios from "axios";

export default async function axiosMethod(endpoint, method, body, headers) {
	const res = await axios({
		method: method,
		data: body,
		url: `${process.env.REACT_APP_API_URL}${endpoint}`,
		withCredentials: true,
		headers: headers,
	});
	const data = res.data;
	return data;
}
