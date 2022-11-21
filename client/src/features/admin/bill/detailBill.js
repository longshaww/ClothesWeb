import '../../../assets/styles/admin/userList.css';
import Logo from '../../../assets/images/hyperX.jpeg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import axiosMethod from '../../../middlewares/axios';
export default function DetailBill() {
    const [data, setData] = useState(null);
    let { id } = useParams();

    const STATUS = {
        PENDING: <span className="badge bg-info text-black fw-bold">Đang chờ xác nhận</span>,
        DELIVERY: <span className="badge bg-info text-black fw-bold">Đang giao</span>,
        SUCCESSFUL_DELIVERY_CONFIRMATION: (
            <span className="badge bg-secondary text-black fw-bold">Giao thành công</span>
        ),
        FAILED_DELIVERY_CONFIRMATION: (
            <span className="badge bg-primary text-black fw-bold">Giao hàng thất bại</span>
        ),
        CANCEL_BILL: <span className="badge bg-success text-black fw-bold">Đã hủy</span>,
    };
    useEffect(() => {
        const getData = async () => {
            const endpoint = `bill/${id}`;
            const res = await axiosMethod(endpoint, 'get');

            setData(res.body);
        };
        getData();
    }, [id]);

    const renderBill = () => {
        if (data !== null) {
            return (
                <div className="userList">
                    <div className="card">
                        <div className="card-body">
                            <div className="container mb-5 mt-3">
                                <div className="row d-flex align-items-baseline">
                                    {/* id */}
                                    <div className="col-xl-9">
                                        <p
                                            style={{
                                                color: '#7e8d9f',
                                                fontSize: '20px',
                                            }}
                                        >
                                            <strong>ID: {data._id}</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="container">
                                    {/* hình ảnh */}
                                    <div className="col-md-12">
                                        <div className="text-center">
                                            <i
                                                className="far fa-building fa-4x ms-0"
                                                style={{
                                                    color: '#8f8061',
                                                }}
                                            ></i>
                                            <p className="pt-2">
                                                {' '}
                                                <img
                                                    id="logo"
                                                    src={Logo}
                                                    alt=""
                                                    className="logo-Img"
                                                ></img>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-8">
                                            <ul className="list-unstyled">
                                                <li className="text-muted">
                                                    Tên Khách Hàng :{' '}
                                                    <span
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    >
                                                        {data?.userID?.information?.name}
                                                    </span>
                                                </li>
                                                <li className="text-muted">
                                                    {' '}
                                                    Địa Chỉ :{' '}
                                                    <span
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    >
                                                        {data?.userID?.information?.address}
                                                    </span>
                                                </li>
                                                <li className="text-muted">
                                                    Số Điện Thoại :{' '}
                                                    <span
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    >
                                                        {data?.userID?.information?.phoneNumber}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-3">
                                            <span className="text-muted">Hóa Đơn</span>
                                            <ul className="list-unstyled">
                                                <li className="text-muted">
                                                    <i
                                                        className="fas fa-circle"
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    ></i>{' '}
                                                    <span className="fw-bold">ID: </span>
                                                    {data._id}
                                                </li>
                                                <li className="text-muted">
                                                    <i
                                                        className="fas fa-circle"
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    ></i>{' '}
                                                    <span className="fw-bold">Được Tạo : </span>{' '}
                                                    <Moment format="DD/MM/YYYY">
                                                        {data.createdAt}
                                                    </Moment>
                                                </li>
                                                <li className="text-muted">
                                                    <i
                                                        className="fas fa-circle"
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    ></i>{' '}
                                                    <span className="fw-bold">
                                                        Phương Thức Thanh Toán :{' '}
                                                    </span>
                                                    {data.paymentMethod}
                                                </li>
                                                <li className="text-muted">
                                                    <i
                                                        className="fas fa-circle"
                                                        style={{
                                                            color: '#8f8061',
                                                        }}
                                                    ></i>{' '}
                                                    <span className="me-1 fw-bold">
                                                        Trạng Thái:
                                                    </span>{' '}
                                                    {STATUS[data?.status] || (
                                                        <span className="badge bg-danger text-black fw-bold">
                                                            Trạng thái không xác định
                                                        </span>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    {data.listProduct.map((el) => (
                                        <>
                                            <div className="row my-2 mx-1 justify-content-center">
                                                <div className="col-md-2 mb-4 mb-md-0">
                                                    <div
                                                        className="
                                            bg-image
                                            ripple
                                            rounded-5
                                            mb-4
                                            overflow-hidden
                                            d-block
                                            "
                                                        data-ripple-color="light"
                                                    >
                                                        <img
                                                            src={el.img}
                                                            className="w-100"
                                                            height="100px"
                                                            alt="Elegant shoes and shirt"
                                                        />
                                                        <a href="#!">
                                                            <div className="hover-overlay">
                                                                <div
                                                                    className="mask"
                                                                    style={{
                                                                        backgroundColor:
                                                                            'hsla(0, 0%, 98.4%, 0.2)',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 mb-4 mb-md-0">
                                                    <p className="fw-bold">{el.name}</p>
                                                    <p className="mb-1">
                                                        <span className="text-muted me-2">
                                                            Size:
                                                        </span>
                                                        <span>{el.size}</span>
                                                    </p>
                                                    <p>
                                                        <span className="text-muted me-2">
                                                            Giá Tiền:
                                                        </span>
                                                        <span>
                                                            {el.sum.toLocaleString()}
                                                            ,000 đ
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="col-md-2 mb-4 mb-md-0">
                                                    <h5 className="mb-2">Số Lượng</h5>
                                                    <span>{el.qty}</span>
                                                </div>
                                                <div className="col-md-3 mb-4 mb-md-0">
                                                    <h5 className="mb-2">Thành Tiền</h5>
                                                    <p className="text-danger">
                                                        <span>
                                                            {el.sum.toLocaleString()}
                                                            ,000 đ
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </>
                                    ))}

                                    <div className="row">
                                        <div className="col-xl-8">
                                            <p className="ms-3">
                                                Nhận hàng vào trong vòng 2 - 3 ngày sau khi đặt .
                                            </p>
                                        </div>
                                        <div className="col-xl-3">
                                            <ul className="list-unstyled">
                                                <li className="text-muted ms-3">
                                                    <span className="text-black me-4">Tổng :</span>
                                                    <span>
                                                        {(data.total - 35).toLocaleString()}
                                                        ,000 đ
                                                    </span>
                                                </li>
                                                <li className="text-muted ms-3 mt-2">
                                                    <span className="text-black">Phí Ship :</span>
                                                    <span
                                                        style={{
                                                            marginLeft: '10px',
                                                        }}
                                                    >
                                                        35,000 đ
                                                    </span>
                                                </li>
                                            </ul>
                                            <hr></hr>
                                            <p
                                                className="text-black float-start"
                                                style={{
                                                    marginLeft: '15px',
                                                }}
                                            >
                                                <span className="text-black me-3">Tổng Tiền</span>
                                                <span
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    {data.total.toLocaleString()}
                                                    ,000 đ
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            <div className="userList"></div>;
        }
    };

    return <>{renderBill()}</>;
}
