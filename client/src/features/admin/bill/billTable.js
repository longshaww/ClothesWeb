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
import { Dropdown, Menu, Tabs } from 'antd';
import TableBoostrap from '../../../components/TableBoostrap';
const STATUS = {
    PENDING: 'Đang chờ xác nhận', //[DELIVERY,CANCEL_BILL]
    DELIVERY: 'Đang giao hàng', //[SUCCESSFUL_DELIVERY_CONFIRMATION,FAILED_DELIVERY_CONFIRMATION,CANCEL_BILL]
    SUCCESSFUL_DELIVERY_CONFIRMATION: 'Thành công', //không có next state
    FAILED_DELIVERY_CONFIRMATION: 'Giao hàng thất bại', //không có next state
    CANCEL_BILL: 'Đã hủy', //không có next state
};

const nextState = {
    PENDING: [
        { status: 'DELIVERY', text: 'Giao hàng' },
        { status: 'CANCEL_BILL', text: 'Hủy đơn' },
    ],
    DELIVERY: [
        { status: 'SUCCESSFUL_DELIVERY_CONFIRMATION', text: 'Thành công' },
        { status: 'FAILED_DELIVERY_CONFIRMATION', text: 'Giao hàng thất bại' },
        { status: 'CANCEL_BILL', text: 'Hủy đơn' },
    ],
};
const BillTable = (props) => {
    const [dataByStatus, setDataByStatus] = useState();
    const [actionStatus, setActionStatus] = useState([]);
    useEffect(() => {
        const filterData = props.data?.filter((item) => STATUS[item.status] == props.status);
        setDataByStatus(filterData);
        const action =
            props.status === STATUS.DELIVERY
                ? nextState.DELIVERY
                : props.status === STATUS.PENDING
                ? nextState.PENDING
                : [];
        setActionStatus(action);
    }, [props.data, props.status]);

    const handleUpdate = async (idBill, status) => {
        try {
            const endpoint = `${process.env.REACT_APP_API_URL}admin/bills/update-bill/${idBill}?typeUpdate=${status}`;

            const res = await axios.put(
                endpoint,
                {},
                {
                    headers: {
                        authorization: 'Bearer ' + props.cookies.accessToken,
                    },
                }
            );

            if (res.data.success === true) {
                props
                    .getData()
                    .then((res) => {
                        props.setData(res);
                        Toast.fire({
                            title: 'Thành Công',
                            icon: 'success',
                        });
                    })
                    .catch((err) => {
                        //setLoading(false);
                        Toast.fire({
                            title: 'Không lấy được danh sách đơn',
                            icon: 'error',
                        });
                    });
            }
        } catch (err) {
            //setLoading(false);
            Toast.fire({
                title: 'Đã xảy ra lỗi',
                icon: 'error',
            });
        }
    };
    const renderStatus = {
        'Đang chờ xác nhận': (
            <span className="badge p-1 bg-info text-white ">Đang chờ xác nhận</span>
        ),
        'Đang giao hàng': (
            <span className="badge p-1 bg-primary text-white fw-bold">Đang giao hàng</span>
        ),
        'Thành công': <span className="badge p-1 bg-success text-white fw-bold">Thành công</span>,
        'Giao hàng thất bại': (
            <span className="badge p-1 bg-danger text-white fw-bold">Giao hàng thất bại</span>
        ),
        'Đã hủy': <span className="badge p-1 bg-warning text-white fw-bold">Đã hủy</span>,
    };

    function headerFormatter(column, colIndex, { sortElement, filterElement }) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div>
                    <span className="nav-text ">{column.text}</span>
                    {sortElement}
                </div>
                <div className="mt-1">{filterElement}</div>
            </div>
        );
    }

    let myCols = [
        {
            dataField: 'id',
            text: 'Mã đơn hàng',
            filter: textFilter({
                placeholder: 'Lọc theo mã đơn hàng',
            }),
            headerStyle: {
                fontSize: '12px',
                minWidth: '160px',
                maxWidth: '170px',
            },
            formatter: (cell, row, index) => {
                return (
                    <Link style={{ color: 'blue' }} to={`/admin/bills/${row.id}`}>
                        {cell}
                    </Link>
                );
            },
        },
        {
            dataField: 'name',
            text: 'Tên khách hàng',
            headerStyle: {
                fontSize: '12px',
                minWidth: '120px',
                maxWidth: '150px',
            },
            filter: textFilter({
                placeholder: 'Lọc theo tên khách hàng',
            }),
        },
        {
            dataField: 'phone',
            text: 'SĐT',
            filter: textFilter({
                placeholder: 'Lọc theo sđt',
            }),
        },
        {
            dataField: 'total',
            text: 'Tổng tiền',
            filter: textFilter({
                placeholder: 'Lọc theo số tiền',
            }),
        },
        {
            dataField: 'paymentMethod',
            text: 'PTTT',
            filter: textFilter({ placeholder: 'Lọc theo PTTT' }),
        },
        {
            dataField: 'status',
            text: 'Trạng thái',
            headerStyle: {
                minWidth: '120px',
                maxWidth: '150px',
                fontSize: '12px',
            },
            formatter: (cell) => renderStatus[STATUS[cell]],
            filter: selectFilter({
                options: STATUS,
                placeholder: 'Lọc theo trạng thái',
            }),
        },
        {
            dataField: 'action',
            text: 'Thao tác',
            headerFormatter: () => {
                return (
                    <div>
                        <p>Thao tác</p>
                        <p style={{ visibility: 'hidden' }}>Xóa lọc</p>
                    </div>
                );
            },
            sort: false,
            headerStyle: {
                fontSize: '12px',
                minWidth: '110px',
                alignItems: 'center',
                padding: 0,
                textAlign: 'center',
            },
            formatter: (cell, row, index) => {
                if (actionStatus) {
                    let action = actionStatus?.map((item, index) => {
                        return {
                            key: index,
                            label: (
                                <span onClick={() => handleUpdate(row?.id, item?.status)}>
                                    <i class="bx bx-edit"></i> {item?.text}
                                </span>
                            ),
                        };
                    });
                    action = [
                        ...action,
                        {
                            key: '1xxx',
                            label: (
                                <span>
                                    <Link to={`/admin/bills/${row.id}`}>
                                        <i class="bx bx-detail"></i> Chi tiết
                                    </Link>
                                </span>
                            ),
                        },
                    ];
                    const menu = <Menu items={action} />;
                    return (
                        <Dropdown overlay={menu}>
                            <a>
                                <i
                                    style={{ cursor: 'pointer' }}
                                    class="bx bx-dots-vertical-rounded"
                                ></i>
                            </a>
                        </Dropdown>
                    );
                }
            },
        },
    ];

    myCols = myCols.map((item) => {
        return {
            sort: true,
            sortCaret: (order, column) => {
                return <i class="bx ctt bx-chevron-down"></i>;
            },
            headerFormatter: headerFormatter,
            headerStyle: {
                fontSize: '12px',
                width: '110px',

                cursor: 'pointer',
            },
            headerAlign: 'center',
            ...item,
        };
    });
    return <>{dataByStatus && <TableBoostrap data={dataByStatus} myCols={myCols} />}</>;
};

export default BillTable;
