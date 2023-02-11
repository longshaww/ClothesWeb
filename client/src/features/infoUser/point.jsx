import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../utils/toast';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { Divider, Tabs } from 'antd';
import BronzeRank from '../../assets/images/rank1.png.webp';
import GoldRank from '../../assets/images/gold.webp';
import SilverRank from '../../assets/images/silver.webp';
import Freenium from '../../assets/images/freenium.webp';
import PointIcon from '../../assets/images/point.svg';
import VoucherIcon from '../../assets/images/voucher.svg';
import VoucherImage from './VoucherImageUI';
import axiosMethod from '../../middlewares/axios';

const RANK = {
    Bronze: {
        icon: BronzeRank,
        text: 'Đồng',
    },
    Gold: {
        icon: GoldRank,
        text: 'Vàng',
    },
    Silver: {
        icon: SilverRank,
        text: 'Bạc',
    },
    Platinum: {
        icon: Freenium,
        text: 'Kim cương',
    },
};

export default function MyPoint() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [voucher, setVoucher] = useState([]);
    const [myVoucher, setMyVoucher] = useState([]);
    useEffect(() => {
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
        fetchData();
    }, []);
    const AutoSetCookie = (accessToken) => {
        setCookie('user', jwtDecode(accessToken), { path: '/' });
        setCookie('accessToken', accessToken, {
            path: '/',
        });
        return;
    };
    //get all voucher
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosMethod(
                    `voucher/availableForExchange/${cookie.user.id}`,
                    'get',
                    null,
                    {
                        authorization: `Bearer ${cookie.accessToken}`,
                    }
                );
                const data = res?.body;
                setVoucher(data);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        fetchData();
    }, [cookie]);

    //get my voucher
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosMethod(`voucher/myVoucher/${cookie.user.id}`, 'get', null, {
                    authorization: `Bearer ${cookie.accessToken}`,
                });
                console.log(res);
                setMyVoucher(res.body);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        fetchData();
    }, [cookie]);
    const handleClick = (body) => {
        const fetchData = async () => {
            try {
                const res = await axiosMethod(`voucher/exchangeVoucher`, 'post', body, {
                    authorization: `Bearer ${cookie.accessToken}`,
                });
                AutoSetCookie(res.body);
                return Toast.fire({
                    title: 'Đổi thành công 1 voucher',
                    icon: 'success',
                });
            } catch (error) {
                return Toast.fire({
                    title: 'Đổi voucher thất bại',
                    icon: 'error',
                });
            }
        };
        if (!checkDisabled(body.discount, body.myPoint)) {
            return Toast.fire({
                title: 'Không đủ điểm',
                icon: 'error',
            });
        } else fetchData();
    };
    const MyPointComponent = () => {
        return (
            <>
                <div>
                    <div className="d-flex">
                        <span className="m-title">
                            Khách hàng: {cookie?.user?.information.name}
                        </span>
                    </div>
                    <div className="d-flex mt-2">
                        <span className="m-title">
                            Số điểm của bạn: {cookie?.user?.myPoint || 0}
                        </span>
                        <img src={PointIcon} alt="Điểm" className="pl-2 xu-balance__img"></img>
                    </div>
                    <div className="d-flex mt-2">
                        <span className="m-title">
                            Rank hiện tại:
                            {RANK[cookie?.user?.vip]?.text}
                        </span>
                        <img
                            width={'30px'}
                            height={'20px'}
                            src={RANK[cookie?.user?.vip]?.icon}
                            alt="rank"
                            className="pl-2 xu-balance__img"
                        ></img>
                    </div>
                </div>
                <div className="row justify-content-around voucher-list mt-2">
                    {voucher?.length > 0 ? (
                        voucher.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="col-lg-5 mt-3 d-flex flex-row align-items-center justify-content-center  shadow voucher-item">
                                    <div className="voucher-item-img">
                                        <VoucherImage></VoucherImage>
                                    </div>
                                    <div className="ml-2 d-flex flex-column voucher-item-detail">
                                        <span className="font-weight-bold">
                                            {' '}
                                            Giảm {item.discount}% tối đa {item.maxDiscount},000đ{' '}
                                        </span>
                                        <span className="font-weight-light">
                                            Cho đơn hàng từ {item.qualifyAmount},000đ{' '}
                                        </span>
                                        <div className="d-flex point-text align-items-center  ">
                                            {/* xem lại */}
                                            <span>Dùng {item.discount === 10 ? 50 : 100}</span>
                                            <img
                                                src={PointIcon}
                                                width="25px"
                                                height="25px"
                                                alt="Điểm"
                                                className="pl-1 xu-balance__img"
                                            ></img>
                                            <span className=" pl-1">để đổi</span>
                                        </div>
                                        <span className="font-weight-light">
                                            HSD:{moment.utc(item.dateEnd).format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        style={{ backgroundColor: '#333', color: '#fff' }}
                                        className="btn ml-5"
                                        onClick={() =>
                                            handleClick({
                                                voucherID: item._id,
                                                userID: cookie.user.id,
                                                discount: item.discount,
                                                myPoint: cookie.user.myPoint,
                                            })
                                        }
                                    >
                                        Đổi
                                    </button>
                                </div>
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img alt="point" className="mascot" src={VoucherIcon}></img>
                        </div>
                    )}
                </div>
            </>
        );
    };
    const MyVoucherComponent = () => {
        return (
            <div className="row justify-content-around voucher-list mt-2">
                {myVoucher?.length > 0 ? (
                    myVoucher.map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="col-lg-5 mt-3 d-flex flex-row align-items-center justify-content-center  shadow voucher-item">
                                <div className="voucher-item-img">
                                    <VoucherImage></VoucherImage>
                                </div>
                                <div className="ml-2 d-flex flex-column voucher-item-detail">
                                    <span className="font-weight-bold">
                                        Giảm {item.discount}% tối đa {item.maxDiscount},000đ{' '}
                                    </span>
                                    <span className="font-weight-light">
                                        Cho đơn hàng từ {item.qualifyAmount},000đ{' '}
                                    </span>
                                    <div className="d-flex point-text align-items-center  ">
                                        {/* xem lại */}
                                        <span>Dùng {item.discount === 10 ? 50 : 100}</span>
                                        <img
                                            src={PointIcon}
                                            width="25px"
                                            height="25px"
                                            alt="Điểm"
                                            className="pl-1 xu-balance__img"
                                        ></img>
                                        <span className=" pl-1">để đổi</span>
                                    </div>
                                    <span className="font-weight-light">
                                        HSD:{moment.utc(item.dateEnd).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="point" className="mascot" src={VoucherIcon}></img>
                    </div>
                )}
            </div>
        );
    };

    const checkDisabled = (discount, myPoint) => {
        discount = discount === 10 ? 10 : 20;
        myPoint = parseInt(myPoint);
        return myPoint >= discount ? true : false;
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
                                label: `Voucher của bạn`,
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
