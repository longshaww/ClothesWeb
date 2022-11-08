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
import TableBoostrap from '../../../components/TableBoostrap';
import LoadingOverplay from '../../../components/loading/loadingOverplay';
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
export default function ListBill() {
    const [data, setData] = useState(null);
    const [cookies] = useCookies();
    //const [loading, //setLoading] = useState(false);
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
        //setLoading(true);
        getData()
            .then((res) => {
                //setLoading(false);
                setData(res);
            })
            .catch((err) => {
                //setLoading(false);
                Toast.fire({
                    title: 'Không lấy được danh sách đơn',
                    icon: 'error',
                });
            });
    }, []);

    // const renderVerify = (status, id) => {
    //     if (status === false) {
    //         return (
    //             <>
    //                 <button className="productListEdit" value={id} onClick={handleVerifyBill}>
    //                     Xác Nhận
    //                 </button>
    //             </>
    //         );
    //     }
    // };
    const handleUpdate = async (idBill, status) => {
        // //setLoading(true);
        try {
            const endpoint = `${process.env.REACT_APP_API_URL}admin/bills/update-bill/${idBill}?typeUpdate=${status}`;

            const res = await axios.put(
                endpoint,
                {},
                {
                    headers: {
                        authorization: 'Bearer ' + cookies.accessToken,
                    },
                }
            );

            if (res.data.success === true) {
                getData()
                    .then((res) => {
                        //setLoading(false);
                        setData(res);
                        Toast.fire({
                            title: 'Xác Nhận Thành Công',
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
    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 250 },
    //     {
    //         field: 'qtyProduct',
    //         headerName: 'Số Lượng',
    //         width: 150,
    //     },
    //     {
    //         field: 'total',
    //         headerName: 'Tổng Tiền',
    //         width: 160,
    //     },
    //     {
    //         field: 'paymentMethod',
    //         headerName: 'Thanh Toán',
    //         width: 160,
    //     },
    //     {
    //         field: 'createdAt',
    //         headerName: 'Ngày Tạo',
    //         width: 160,
    //     },

    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         width: 150,
    //         renderCell: (params) => {
    //             return (
    //                 <>
    //                     {/* {renderVerify(params.row.status, params.row.id)} */}
    //                     cái gì đây
    //                     <Link to={params.row.id}>
    //                         <InfoIcon />
    //                     </Link>
    //                 </>
    //             );
    //         },
    //     },
    // ];

    let myCols = [
        {
            dataField: 'id',
            text: 'ID',
            filter: textFilter({
                placeholder: 'Custom PlaceHolder',
            }),
        },
        {
            dataField: 'name',
            text: 'Tên khách hàng',
            headerStyle: {
                fontSize: '12px',
                width: '150px',
            },
            filter: textFilter({
                placeholder: 'Custom PlaceHolder',
            }),
        },
        {
            dataField: 'phone',
            text: 'SĐT',

            filter: textFilter({
                placeholder: 'Custom PlaceHolder',
            }),
        },
        {
            dataField: 'total',
            text: 'Tổng tiền',
            filter: textFilter(),
        },
        {
            dataField: 'paymentMethod',
            text: 'Thanh toán',
            filter: textFilter(),
        },
        {
            dataField: 'qtyProduct',
            text: 'Số lượng',
            filter: textFilter(),
        },
        {
            dataField: 'status',
            text: 'Trạng thái',
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
                width: '110px',
                alignItems: 'center',
                padding: 0,
                textAlign: 'center',
            },
            formatter: (cell, row, index) => {
                return (
                    <>
                        <i
                            id={`c${index}`}
                            style={{ cursor: 'pointer' }}
                            class="bx bx-dots-vertical-rounded"
                        ></i>

                        <UncontrolledPopover
                            placement="bottom"
                            target={`c${index}`}
                            trigger="legacy"
                            className="action-popup"
                        >
                            <ul className="action-list">
                                {/* {nextState[row.status] && (
                                    <li className="action-item">
                                        <i class="bx bx-edit-alt"></i> {nextState[row.status]}
                                    </li>
                                       <li className="action-item">
                                       <i class="bx bx-message-square-x"></i> Hủy
                                   </li>
                                )} */}

                                {nextState[row.status] &&
                                    nextState[row.status].map((item) => (
                                        <li
                                            onClick={() => handleUpdate(row.id, item.status)}
                                            className="action-item"
                                        >
                                            <i class="bx bx-edit"></i> {item.text}
                                        </li>
                                    ))}

                                <li className="action-item">
                                    <i class="bx bx-message-square-x"></i> Xóa
                                </li>

                                <li className="action-item">
                                    <Link to={`/admin/bills/${row.id}`}>
                                        <i class="bx bx-detail"></i> Chi tiết
                                    </Link>
                                </li>
                            </ul>
                        </UncontrolledPopover>
                    </>
                );
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

    return (
        <>
            <div className="productList">
                {data && <TableBoostrap data={data} myCols={myCols} />}
            </div>
        </>
    );
}
