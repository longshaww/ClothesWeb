import axios from 'axios';

import jwtDecode from 'jwt-decode';
export default function updateUserData(cookie, setCookie) {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}user/getUser/${cookie?.user?.id}`,
                {
                    headers: {
                        authorization: 'Bearer ' + cookie.accessToken,
                    },
                }
            );

            if (data.success) {
                return AutoSetCookie(data.accessToken);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const AutoSetCookie = (accessToken) => {
        setCookie('user', jwtDecode(accessToken), { path: '/' });
        setCookie('accessToken', accessToken, {
            path: '/',
        });
    };
    fetchData();
}
