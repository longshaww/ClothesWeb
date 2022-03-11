import axios from "axios";

export default async function axiosMethod(endpoint, method, body) {
	const res = await axios({
		method: method,
		data: body,
		url: `${process.env.REACT_APP_API_URL}${endpoint}`,
		withCredentials: true,
	});
	const data = res.data;
	return data;
}
