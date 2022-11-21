import axios from 'axios';

/**
 * Axios
 *
 * @param {String} endpoint endpoint URL
 * @param {String} method GET|POST|PUT|DELETE
 * @param {Object} body payload
 * @param {Object} headers {authorization: 'Bearer ' + cookies.accessToken}
 * @return {JSON} api
 */
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
