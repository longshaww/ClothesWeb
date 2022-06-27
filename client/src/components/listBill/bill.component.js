import { formatPrice } from "../../utils/format.price";
import moment from "moment";
import Toast from "../../utils/toast";
import { useCookies } from "react-cookie";
import axiosMethod from "../../middlewares/axios";
import { Link } from 'react-router-dom';
export default function BillComponent({ bill }) {
	const [cookies] = useCookies(["user"]);
	console.log(bill)
	return (
		<>
					<div className="d-flex justify-content-center mt-3">
						<div className="p-4 shadow w-75 rounded-3 border">
							<div className="text-center text-danger">
								<h3>
                                         Hóa Đơn
								</h3>
							</div>
							<div className="row pt-2">
								<div className="col-6 col-lg-4">
								
									<img
										src="https://product.hstatic.net/200000280689/product/3ed2af449b37b3db9f5cef10be482620_cb1bf95947f04207bd8a92d3fbac6f13_master.jpg"
										className="img-fluid rounded"
										alt=""
									/>
								</div>
								<div className="col px-4 py-2 rounded-3 border">
									<h4 className="text-center">
										Thông tin
									</h4>
									<div className="row fs-5">
										<div className="col">
											<div>Tổng Số Lượng</div>
											<div>Phí Ship</div>
											<div>Tổng Tiền</div>
										</div>
										<div className="col-8 text-end">
											<div>
												{bill.qtyProduct}
											</div>
											<div>
												{bill.shippingFee},000 đ
											</div>
											<div>
												{bill.subTotal.toLocaleString()},000 đ
											</div>
											<div className="mt-2">
											Trạng Thái : {bill.status ? <span className="text-success" >Đã Xác Nhận</span> : <span className="text-danger" >Chưa Xác Nhận</span>}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-center mt-3">
								<Link to={`/user/detailBill/${bill._id}`}>
								<button
									className="btn btn-dark"
								>
									Chi Tiêt
								</button>
								</Link>
								
							</div>
						</div>
					</div>
				)
		</>
	);
}
