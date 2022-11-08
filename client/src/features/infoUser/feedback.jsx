import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../utils/toast';
import moment from 'moment';
import { isDate, checkIsValidName, validatePhoneNumber } from '../../utils/functionValidate';
import EditIcon from '@mui/icons-material/Edit';
import jwtDecode from 'jwt-decode';
import { Divider } from 'antd';

export default function FeedBack() {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'accessToken']);

    useEffect(async () => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}user/getUser/${cookies?.user?.id}`,
                    {
                        headers: {
                            authorization: 'Bearer ' + cookies.accessToken,
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
        fetchData();
    }, []);
    const AutoSetCookie = (accessToken) => {
        setCookie('user', jwtDecode(accessToken), { path: '/' });
        setCookie('accessToken', accessToken, {
            path: '/',
        });
        return;
    };

    const handleRate = () => {
        const fakeBody = {
            userID: cookies?.user?.id,
            data: {
                content: 'Khang cmt',
                rate: 4,
            },
        };

        //idProduct:6232fbf001830a245b8d750b
        //6232fbf001830a245b8d750f
        axios
            .post(`${process.env.REACT_APP_API_URL}user/rate/6232fbf001830a245b8d750e`, fakeBody, {
                headers: {
                    authorization: 'Bearer ' + cookies.accessToken,
                },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <>
            <div className="p-5">
                <div className=" text-center">
                    <span className="m-title"> ĐÁNH GIÁ SẢN PHẨM</span>
                </div>
                <Divider></Divider>
                <div className="row">
                    <button onClick={handleRate}> rate</button>
                </div>
            </div>
        </>
    );
}
