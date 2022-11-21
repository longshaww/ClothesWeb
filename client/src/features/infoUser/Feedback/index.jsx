import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../../utils/toast';
import { successFulDeliveryConfirmation } from '../../../constants/constants';
import jwtDecode from 'jwt-decode';

import FeedBackProduct from './component/FeedBack';
import { Tabs } from 'antd';
export default function FeedBack() {
    const [cookies, setCookie] = useCookies(['user', 'accessToken']);
    const [validProduct, setValidProduct] = useState();

    const [render, setRender] = useState(true);
    const [loading, setLoading] = useState(true);
    // get list bill
    useEffect(() => {
        const endpoint = `${process.env.REACT_APP_API_URL}user/getBillUser/${cookies.user.id}`;
        const headers = {
            authorization: 'Bearer ' + cookies.accessToken,
        };
        axios
            .get(endpoint, { headers })
            .then((res) => {
                setLoading(false);
                const data = res?.data?.listBill;
                //lấy những bill có stt=thành công
                const listBill = data?.filter(
                    (item) => item?.status === successFulDeliveryConfirmation
                );
                //lấy ra list product
                const productIdList = listBill?.map((item) => item.listProduct).flat(Infinity);

                setValidProduct(productIdList);
            })
            .catch((err) => {
                console.log('🚀 ~ file: feedback.jsx ~ line 37 ~ useEffect ~ err', err);
                return Toast.fire({
                    title: 'Failed to fetch',
                    icon: 'error',
                });
            });
    }, [render]);

    // auto setcookies
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

    return (
        <>
            <div className="p-5">
                <div className=" text-center">
                    <span className="m-title"> ĐÁNH GIÁ SẢN PHẨM</span>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: `Chưa đánh giá`,
                            key: '1',
                            children: validProduct && (
                                <FeedBackProduct
                                    loading={loading}
                                    cookies={cookies}
                                    setRender={setRender}
                                    validProduct={validProduct.filter((item) => !item.isFeedBack)}
                                ></FeedBackProduct>
                            ),
                        },
                        {
                            label: `Đã đánh giá`,
                            key: '2',
                            children: validProduct && (
                                <FeedBackProduct
                                    cookies={cookies}
                                    loading={loading}
                                    setRender={setRender}
                                    validProduct={validProduct.filter((item) => item.isFeedBack)}
                                ></FeedBackProduct>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
}
