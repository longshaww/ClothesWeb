import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../utils/toast';
import moment from 'moment';
import { isDate, checkIsValidName, validatePhoneNumber } from '../../utils/functionValidate';
import EditIcon from '@mui/icons-material/Edit';
import jwtDecode from 'jwt-decode';
import { Divider, Tabs } from 'antd';

export default function MyPoint() {
    const [cookie] = useCookies();
    // console.log('🚀 ~ file: point.jsx ~ line 13 ~ MyPoint ~ cookie', cookie.user);

    const handleClick = () => {
        const getData = async () => {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API_URL}user/exchangeVoucher/`,
                    {
                        headers: {
                            authorization: 'Bearer ' + cookie.accessToken,
                        },
                    }
                );
                console.log('🚀 ~ file: point.jsx ~ line 19 ~ getData ~ data', data);
            } catch (err) {
                console.log('🚀 ~ file: point.jsx ~ line 28 ~ getData ~ err', err);
            }
        };
        getData();
    };
    const MyPointComponent = () => {
        return (
            <div>
                <div className="d-flex">
                    <span className="m-title">Số điểm của bạn: {cookie?.user?.myPoint || 0}</span>
                    <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/TopUpXu/xu-icon.svg"
                        alt="xu"
                        class="pl-2 xu-balance__img"
                    ></img>
                </div>
                <div className="mt-2">
                    <button type="button" onClick={handleClick} class="btn btn-primary">
                        Đổi voucher
                    </button>
                </div>
            </div>
        );
    };
    const MyVoucherComponent = () => {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    class="mascot"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot-1.svg"
                ></img>
                <span className="m-title">Bạn chưa có voucher nào</span>
            </div>
        );
    };
    return (
        <>
            <div className="p-5">
                <div className="row justify-content-center">
                    <div className="d-flex justify-content-center  m-title">ĐIỂM TÍCH LŨY</div>
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: `Đổi điểm`,
                                key: '1',
                                children: <MyPointComponent />,
                            },
                            {
                                label: `Danh sách voucher`,
                                key: '2',
                                children: <MyVoucherComponent />,
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
