import '../../../assets/styles/admin/productList.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../../utils/toast';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'boxicons';
import './index.css';
import { Tabs } from 'antd';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import BillTable from './billTable';
import moment from 'moment';
import { TextField } from '@mui/material';

const STATUS = {
    PENDING: 'Đang chờ xác nhận', //[DELIVERY,CANCEL_BILL]
    DELIVERY: 'Đang giao hàng', //[SUCCESSFUL_DELIVERY_CONFIRMATION,FAILED_DELIVERY_CONFIRMATION,CANCEL_BILL]
    SUCCESSFUL_DELIVERY_CONFIRMATION: 'Thành công', //không có next state
    FAILED_DELIVERY_CONFIRMATION: 'Giao hàng thất bại', //không có next state
    CANCEL_BILL: 'Đã hủy', //không có next state
};

export default function ListBill() {
    const [data, setData] = useState(null);
    const [cookies] = useCookies();
    const [status, setStatus] = useState(STATUS.PENDING);
    const [filter, setFilter] = useState({
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
    });
    const handleDateStartChange = (newValue) => {
        setFilter({ ...filter, startDate: moment(newValue).format('YYYY-MM-DD') });
    };
    const handleDateEndChange = (newValue) => {
        setFilter({ ...filter, endDate: moment(newValue).format('YYYY-MM-DD') });
    };

    const getData = async () => {
        const endpoint = `${process.env.REACT_APP_API_URL}admin/bills/getAllBill`;
        const { data } = await axios.get(endpoint, {
            headers: {
                authorization: 'Bearer ' + cookies.accessToken,
            },
        });

        return data.listBillCustom;
    };

    useEffect(() => {
        getData()
            .then((res) => {
                const filterData = res?.filter((item) => {
                    const arrDate = item.createdAt.match(/\d+/g).map(Number);
                    let createdAt = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
                    createdAt = moment(new Date(createdAt)).format('YYYY-MM-DD');
                    return createdAt >= filter.startDate && createdAt <= filter.endDate;
                });
                setData(filterData);
            })
            .catch((err) => {
                Toast.fire({
                    title: 'Không lấy được danh sách đơn',
                    icon: 'error',
                });
            });
    }, [filter]);

    return (
        <>
            {data && (
                <div>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 3,
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày bắt đầu"
                                inputFormat="DD/MM/YYYY"
                                value={filter.startDate}
                                onChange={handleDateStartChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày kết thúc"
                                inputFormat="DD/MM/YYYY"
                                value={filter.endDate}
                                onChange={handleDateEndChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Tabs
                        onChange={(activeKey) => {
                            console.log(activeKey);
                            setStatus(activeKey);
                        }}
                        defaultActiveKey="1"
                    >
                        <Tabs.TabPane tab="Đang chờ" key={STATUS.PENDING}>
                            <BillTable
                                cookies={cookies}
                                data={data}
                                setData={setData}
                                getData={getData}
                                key={1}
                                status={status}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Đang giao" key={STATUS.DELIVERY}>
                            <BillTable
                                cookies={cookies}
                                data={data}
                                setData={setData}
                                key={2}
                                getData={getData}
                                status={status}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab="Thành công"
                            key={STATUS.SUCCESSFUL_DELIVERY_CONFIRMATION}
                        >
                            <BillTable
                                cookies={cookies}
                                data={data}
                                key={3}
                                setData={setData}
                                getData={getData}
                                status={status}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Thất bại" key={STATUS.FAILED_DELIVERY_CONFIRMATION}>
                            <BillTable
                                cookies={cookies}
                                data={data}
                                key={4}
                                setData={setData}
                                getData={getData}
                                status={status}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Đã hủy" key={STATUS.CANCEL_BILL}>
                            <BillTable
                                cookies={cookies}
                                data={data}
                                key={5}
                                setData={setData}
                                getData={getData}
                                status={status}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            )}
        </>
    );
}
