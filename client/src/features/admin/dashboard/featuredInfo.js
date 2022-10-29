import '../../../assets/styles/admin/featuredInfo.css';
import globalStateAndAction from '../../../container/global.state.action';
import { useState } from 'react';
import { useEffect } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { TextField } from '@mui/material';

function FeaturedInfo({ listDashBoard }) {
    const [infoQty, setInfoQty] = useState({
        qtyProduct: 0,
        qtyBill: 0,
        qtyUser: 0,
    });
    const [date, setDate] = useState({ startDate: new Date(), endDate: new Date() });

    useEffect(() => {
        setInfoQty(() => ({
            qtyProduct: listDashBoard.qtyProduct,
            qtyBill: listDashBoard.qtyBill,
            qtyUser: listDashBoard.qtyUser,
        }));
    }, [listDashBoard]);
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Ngày bắt đầu"
                    inputFormat="DD/MM/YYYY"
                    value={date.startDate}
                    // onChange={handleDateEndChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>{' '}
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Ngày kết thúc"
                    inputFormat="DD/MM/YYYY"
                    value={date.endDate}
                    // onChange={handleDateEndChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">TỔNG SẢN PHẨM</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{infoQty.qtyProduct}</span>
                    </div>
                    <span className="featuredSub">SẢN PHẨM</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">TỔNG ĐƠN TRONG THÁNG</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{infoQty.qtyBill}</span>
                    </div>
                    <span className="featuredSub">ĐƠN HÀNG</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">TỔNG KHÁCH HÀNG</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{infoQty.qtyUser}</span>
                    </div>
                    <span className="featuredSub">KHÁCH HÀNG</span>
                </div>
            </div>
        </>
    );
}
export default globalStateAndAction(FeaturedInfo);
