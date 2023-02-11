import { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import BillComponent from './bill.component';
import axios from 'axios';
import EmptyBill from './emptyBill';
import {
    cancelBill,
    deliveryBill,
    pendingBill,
    successFulDeliveryConfirmation,
} from '../../constants/constants';
import { Tabs } from 'antd';
export default function BillMe() {
    const [listBill, setListBill] = useState(null);
    const [cookies] = useCookies(['user,accessToken']);

    async function getListBillMe() {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}user/getBillUser/${cookies.user.id}`,
            {
                headers: {
                    authorization: 'Bearer ' + cookies.accessToken,
                },
            }
        );
        if (data.success) {
            setListBill(data.listBill);
        }
    }

    useEffect(() => {
        getListBillMe();
    }, []);
    return (
        <>
            <div className="p-5">
                <div className="row justify-content-center">
                    <div className="d-flex justify-content-center  m-title"></div>
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: `Chờ xác nhận`,
                                key: '1',
                                children: (
                                    <>
                                        {listBill && listBill?.length > 0 ? (
                                            listBill?.map((el) => {
                                                if (el.status === pendingBill) {
                                                    return (
                                                        <BillComponent
                                                            setData={setListBill}
                                                            getData={getListBillMe}
                                                            bill={el}
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            <EmptyBill />
                                        )}
                                    </>
                                ),
                            },
                            {
                                label: `Đang giao`,
                                key: '2',
                                children: (
                                    <>
                                        {listBill && listBill?.length > 0 ? (
                                            listBill?.map((el) => {
                                                if (el.status === deliveryBill) {
                                                    return (
                                                        <BillComponent
                                                            setData={setListBill}
                                                            getData={getListBillMe}
                                                            bill={el}
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            <EmptyBill />
                                        )}
                                    </>
                                ),
                            },
                            {
                                label: `Đã giao`,
                                key: '3',
                                children: (
                                    <>
                                        {listBill && listBill?.length > 0 ? (
                                            listBill?.map((el) => {
                                                if (el.status === successFulDeliveryConfirmation) {
                                                    return (
                                                        <BillComponent
                                                            setData={setListBill}
                                                            getData={getListBillMe}
                                                            bill={el}
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            <EmptyBill />
                                        )}
                                    </>
                                ),
                            },
                            {
                                label: `Đã hủy`,
                                key: '4',
                                children: (
                                    <>
                                        {listBill && listBill?.length > 0 ? (
                                            listBill?.map((el) => {
                                                if (el.status === cancelBill) {
                                                    return (
                                                        <BillComponent
                                                            setData={setListBill}
                                                            getData={getListBillMe}
                                                            bill={el}
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            <EmptyBill />
                                        )}
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
