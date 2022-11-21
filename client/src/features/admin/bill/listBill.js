import '../../../assets/styles/admin/productList.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../../utils/toast';
import InfoIcon from '@mui/icons-material/Info';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { UncontrolledPopover } from 'reactstrap';
import 'boxicons';
import './index.css';
import { Tabs } from 'antd';
import TableBoostrap from '../../../components/TableBoostrap';
import BillTable from './billTable';

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
                setData(res);
            })
            .catch((err) => {
                Toast.fire({
                    title: 'Không lấy được danh sách đơn',
                    icon: 'error',
                });
            });
    }, []);

    return (
        <>
            {data && (
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
                    <Tabs.TabPane tab="Thành công" key={STATUS.SUCCESSFUL_DELIVERY_CONFIRMATION}>
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
            )}
            ;
        </>
    );
}
