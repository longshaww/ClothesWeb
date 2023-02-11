import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import {
    cancelBill,
    deliveryBill,
    failedDeliveryConfirmation,
    pendingBill,
    successFulDeliveryConfirmation,
} from '../../constants/constants';
import Toast from '../../utils/toast';

export default function BillComponent({ bill, getData }) {
    const [cookies] = useCookies(['user']);
    const handleBillState = (status) => {
        if (status === pendingBill) {
            return 'Chờ xác nhận';
        } else if (status === deliveryBill) {
            return 'Đang giao';
        } else if (status === successFulDeliveryConfirmation) {
            return 'Đã giao';
        } else if (status === failedDeliveryConfirmation) {
            return 'Giao thất bại';
        } else if (status === cancelBill) {
            return 'Đã hủy';
        }
    };

    const handleCancelBill = async (billId) => {
        try {
            const endpoint = `${process.env.REACT_APP_API_URL}/bill/update-cancelBill/${billId}`;

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
                try {
                    await getData();
                    Toast.fire({
                        title: 'Hủy thành Công',
                        icon: 'success',
                    });
                } catch (error) {
                    Toast.fire({
                        title: 'Một lỗi bất ngờ đã xảy ra',
                        icon: 'error',
                    });
                }
            }
        } catch (err) {
            Toast.fire({
                title: 'Hủy thất bại',
                icon: 'error',
            });
        }
    };
    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <div className="p-4 shadow w-75 rounded-3 border">
                    <div className="text-center text-danger">
                        <h3 className="fw-bold fs-4">Hóa Đơn</h3>
                    </div>
                    <div className="row pt-2">
                        <div className="col-6 col-lg-4">
                            <img
                                src={bill.listProduct[0]?.img}
                                className="img-fluid rounded border"
                                alt=""
                            />
                        </div>
                        <div className="col px-4 py-2 rounded-3 border">
                            <h4 className="text-center">Thông tin</h4>
                            <div className="row fs-5">
                                <div className="col">
                                    <div>Số Lượng</div>
                                    <div>Phí Ship</div>
                                    <div>Tổng Tiền</div>
                                </div>
                                <div className="col-8 text-end">
                                    <div>{bill.qtyProduct}</div>
                                    <div>{bill.shippingFee},000 đ</div>
                                    <div>{bill.subTotal.toLocaleString()},000 đ</div>
                                    <div className="mt-2">
                                        Trạng Thái: {handleBillState(bill.status)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center d-flex mt-3">
                        <Link to={`/user/detailBill/${bill._id}`}>
                            <button className="btn btn-dark">Chi Tiêt</button>
                        </Link>
                        <>
                            {(bill.status === pendingBill || bill.status === deliveryBill) && (
                                <button
                                    onClick={() => handleCancelBill(bill._id)}
                                    className="ml-2 btn btn-danger"
                                >
                                    Hủy đơn
                                </button>
                            )}{' '}
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}
