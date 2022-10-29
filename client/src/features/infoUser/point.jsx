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
    Freenium: {
        icon: Freenium,
        text: 'Kim cương',
    },
};

export default function MyPoint() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [voucher, setVoucher] = useState();
    const [myVoucher, setMyVoucher] = useState();

    //get all voucher
    useEffect(() => {
        const fetchData = async () => {
            // `user/availableForExchange/${cookie.user.id}`,
            try {
                const res = await axiosMethod(`voucher`, 'get', null, {
                    authorization: `Bearer ${cookie.accessToken}`,
                });
                const data = res?.body?.filter(
                    (item) => !item?.listUser?.includes(cookie?.user?.id)
                );
                setVoucher(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [cookie]);

    //get my voucher
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosMethod(
                    `user/availableForExchange/${cookie.user.id}`,
                    'get',
                    null,
                    {
                        authorization: `Bearer ${cookie.accessToken}`,
                    }
                );

                setMyVoucher(res.body);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [cookie]);
    const handleClick = (body) => {
        const fetchData = async () => {
            try {
                const res = await axiosMethod(`user/exchangeVoucher`, 'post', body, {
                    authorization: `Bearer ${cookie.accessToken}`,
                });

                console.log(res.body);
                // setCookie('user', res?.body, { path: '/' });
                // // setCookie('accessToken', res?.accessToken, {
                // //     path: '/',
                // // });

                Toast.fire({
                    title: 'Đổi thành công 1 voucher',
                    icon: 'success',
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
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
                        <img src={PointIcon} alt="Điểm" class="pl-2 xu-balance__img"></img>
                    </div>
                    <div className="d-flex mt-2">
                        <span className="m-title">
                            Rank hiện tại: {RANK[cookie?.user?.vip].text}
                        </span>
                        <img
                            width={'30px'}
                            height={'20px'}
                            src={RANK[cookie?.user?.vip].icon}
                            alt="rank"
                            class="pl-2 xu-balance__img"
                        ></img>
                    </div>
                </div>
                <div className="row voucher-list mt-5">
                    {voucher?.length > 0 ? (
                        voucher.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="col-lg-5 d-flex align-items-center flex-row shadow voucher-item">
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
                                                class="pl-1 xu-balance__img"
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
                                        class="btn ml-5"
                                        onClick={() =>
                                            handleClick({
                                                voucherID: item._id,
                                                userID: cookie.user.id,
                                            })
                                        }
                                    >
                                        Đổi
                                    </button>
                                </div>
                                <div className="col-lg-2"></div>
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img alt="point" class="mascot" src={VoucherIcon}></img>
                        </div>
                    )}
                </div>
            </>
        );
    };
    const MyVoucherComponent = () => {
        return (
            <div className="row voucher-list mt-5">
                {myVoucher?.length > 0 ? (
                    myVoucher.map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="col-lg-5 d-flex align-items-center flex-row shadow voucher-item">
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

                                    <span className="font-weight-light">
                                        HSD:{moment.utc(item.dateEnd).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                                {/* <button
                                    type="button"
                                    style={{ backgroundColor: '#333', color: '#fff' }}
                                    class="btn ml-5"
                                    onClick={() =>
                                        handleClick({
                                            voucherID: item._id,
                                            userID: cookie.user.id,
                                        })
                                    }
                                >
                                    Đổi
                                </button> */}
                            </div>
                            <div className="col-lg-2"></div>
                        </React.Fragment>
                    ))
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="icon" class="mascot" src={VoucherIcon}></img>
                        <span className="m-title">Bạn chưa có voucher nào</span>
                    </div>
                )}
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
