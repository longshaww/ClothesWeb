import { useState, useCallback, useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosMethod from "../../../middlewares/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function PaymentMethod() {
	const firstUpdate = useRef(true);
	const MySwal = withReactContent(Swal);
	const navigate = useNavigate();
	const [checkedPayment, setCheckedPayment] = useState(1);
	const checkedShipping = "Phí vận chuyển";

	const radio = [
		{
			id: 1,
			name: "Thanh toán khi giao hàng (COD)",
		},
		{ id: 2, name: "Thanh toán Online" },
	];

	const shippingChange = () => {};

	//Handle POST
	const postCODCB = useCallback((data) => {
		postCOD(data);
	}, []);

	async function postCOD(data) {
		const req = await axiosMethod("bill", "post", data);
		return req;
	}
	useLayoutEffect(() => {
		if (firstUpdate) {
			firstUpdate.current = false;
			return;
		}
		postCODCB();
	}, [postCODCB]);

	//Alert if success
	const sweetAlertSuccess = (customer) => {
		MySwal.fire({
			title: <p>Đang xử lý</p>,
			didOpen: () => {
				MySwal.showLoading();
				postCODCB(customer);
			},
			timer: 1000,
		})
			.then(() => {
				return MySwal.fire({
					title: "Thành công",
					icon: "success",
					didOpen: () => {
						MySwal.showLoading();
						localStorage.removeItem("customer");
					},
					timer: 1000,
				});
			})
			.then(() => {
				navigate("/checkout/method/COD/success");
			});
	};

	//alert if error
	const sweetAlertError = (customer) => {
		if (!customer) {
			MySwal.fire({
				icon: "warning",
				title: (
					<p>Quý khách đã thanh toán hoặc chưa nhập thông tin</p>
				),
				confirmButtonText: "Nhập thông tin",
				denyButtonText: "Tiếp tục mua hàng",
				cancelButtonText: "Thoát",
				showDenyButton: true,
				showCancelButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/checkout");
				}
				if (result.isDenied) {
					navigate("/collections");
				}
			});
			return true;
		}
	};
	//Handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		const customer = JSON.parse(localStorage.getItem("customer"));
		if (sweetAlertError(customer)) return;

		if (checkedPayment === 1) {
			customer.paymentMethod = "COD";
			sweetAlertSuccess(customer);
		}
		if (checkedPayment === 2) {
			navigate("/checkout/method/online");
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="shipping-method mb-5">
					<h4>Phương thức vận chuyển</h4>
					<div className="content-box border rounded p-3">
						<div className="form-check d-flex">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
								onChange={shippingChange}
								checked={
									checkedShipping ===
									"Phí vận chuyển"
								}
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault1"
							>
								{checkedShipping}
							</label>
							<span className="ms-auto">35.000đ</span>
						</div>
					</div>
				</div>
				<div className="payment-method mb-5">
					<h4>Phương thức thanh toán</h4>
					{radio.map((el, index) => {
						return (
							<div
								className="content-box border rounded p-3"
								key={index}
							>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="payment"
										id="COD"
										checked={
											checkedPayment === el.id
										}
										onChange={() =>
											setCheckedPayment(el.id)
										}
									/>
									<label
										className="form-check-label"
										htmlFor="COD"
									>
										{el.name}
									</label>
								</div>
							</div>
						);
					})}
				</div>
				<div className="step-footer d-flex">
					<Link to="/checkout">
						Quay lại thông tin giao hàng
					</Link>
					<button className="btn btn-primary ms-auto">
						Hoàn tất đơn hàng
					</button>
				</div>
			</form>
		</>
	);
}
