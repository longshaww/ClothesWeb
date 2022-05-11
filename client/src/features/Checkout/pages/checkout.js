import globalStateAndAction from "../../../container/global.state.action";
import { Link } from "react-router-dom";
import "../../../assets/styles/checkout.css";
import { useState, useEffect } from "react";
import axiosMethod from "../../../middlewares/axios";

function Checkout({ cart }) {
	const cartStore = cart.cartStore;
	const [data, setData] = useState([]);
	const [dataCity, setDataCity] = useState();
	const [dataListProvince, setListProvince] = useState([]);
	const [dataProvince, setProvince] = useState();
	const [dataListWards, setListWards] = useState([]);
	const [dataWard, setWard] = useState([]);

	const [inputs, setInputs] = useState({});
	const [payment, setPayment] = useState({
		paymentMethod: "COD",
	});

	const [checked, setChecked] = useState("COD");

	//Get inputs
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	//Submit Form
	const handleSubmit = (event) => {
		event.preventDefault();
		const { paymentMethod } = payment;
		const data = {
			...inputs,
			paymentMethod,
			listProduct: cartStore.cart.map((el) => {
				return {
					_id: el._id._id,
					size: el.size,
					qty: el.qty,
					sum: el.total,
				};
			}),
		};
		console.log(data);
	};
	//Get Radio button
	const handlePaymentMethodChange = (event) => {
		const { name, value } = event.target;
		setPayment({ [name]: value });
		setChecked(value);
	};

	useEffect(async () => {
		const location = await axiosMethod("getlocation", "get");
		setData(location);
	}, []);

	const handleClickCity = (event) => {
		// value city click
		const valueCity = event.target.value;
		if (valueCity !== " ") {
			console.log("da vao");
			// filter data belong city
			const dataBeLongCity = data.filter((el) => {
				return el.Id === valueCity;
			});
			// get district
			const listDistrict = dataBeLongCity[0].Districts;
			// set value city
			setDataCity(valueCity);
			// setListProvince belong city
			setListProvince(listDistrict);
		} else {
			setDataCity(" ");
			setListProvince(" ");
			setListWards(" ");
		}
	};

	const handleClickProvince = (event) => {
		const valueProvince = event.target.value;
		if (valueProvince !== " ") {
			setProvince(valueProvince);

			const dataBeLongProvince = dataListProvince.filter((el) => {
				return el.Id === valueProvince;
			});
			const listWards = dataBeLongProvince[0].Wards;
			console.log(listWards);
			setListWards(listWards);
		} else {
			setProvince(" ");
			setListWards(" ");
		}
	};

	const handleClickWard = (event) => {
		setWard(event.target.value);
	};
	return (
		<div className="container pe-5 my-5">
			<div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
				<div className="col col-left pe-5 pt-5">
					<div className="header pb-2">
						<h2 className="m-0">HYPERX</h2>
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 mt-2">
								<li className="breadcrumb-item">
									<Link to="#">Giỏ hàng</Link>
								</li>
								<li className="breadcrumb-item">
									Thông tin giỏ hàng
								</li>
								<li
									className="breadcrumb-item active"
									aria-current="page"
								>
									<small className="text-muted">
										Phương thức thanh toán
									</small>
								</li>
							</ol>
						</nav>
					</div>
					<form className="section" onSubmit={handleSubmit}>
						<span>Thông tin giao hàng</span>
						<p className="mt-3">
							Bạn đã có tài khoản ?
							<Link to="#"> Đăng nhập</Link>
						</p>
						<input
							type="text"
							name="customerName"
							value={inputs.customerName || ""}
							className="form-control"
							placeholder="Họ và tên"
							onChange={handleChange}
						></input>
						<div className="row">
							<div className="col">
								<input
									type="text"
									className="form-control"
									placeholder="Email"
									value={inputs.email || ""}
									onChange={handleChange}
									name="email"
								/>
							</div>
							<div className="col-4">
								<input
									type="text"
									name="phoneNumber"
									value={inputs.phoneNumber || ""}
									className="form-control"
									onChange={handleChange}
									placeholder="Số điện thoại"
								/>
							</div>
						</div>
						<input
							type="text"
							className="form-control"
							name="address"
							value={inputs.address || ""}
							onChange={handleChange}
							placeholder="Địa chỉ"
						></input>
						<div className="row">
							<div className="col">
								<select
									style={{
										width: "100%",
										height: "",
									}}
									onChange={handleClickCity}
									className="form-control"
								>
									<option value={" "}>
										Chọn Tỉnh/Thành Phố{" "}
									</option>
									{data.map((el, index) => {
										return (
											<option
												key={index}
												value={el.Id}
											>
												{el.Name}
											</option>
										);
									})}
								</select>
								<div className="mt-3">
									<div className="form-check">
										<input
											className="form-check-input"
											type="radio"
											name="paymentMethod"
											checked={
												checked === "COD"
											}
											id="COD"
											value="COD"
											onChange={
												handlePaymentMethodChange
											}
										/>
										<label
											className="form-check-label"
											htmlFor="COD"
										>
											Thanh toán COD
										</label>
									</div>
									<div className="form-check">
										<input
											className="form-check-input"
											type="radio"
											checked={
												checked === "Online"
											}
											value="Online"
											name="paymentMethod"
											onChange={
												handlePaymentMethodChange
											}
											id="Online"
										/>
										<label
											className="form-check-label"
											htmlFor="Online"
										>
											Thanh toán Online
										</label>
									</div>
								</div>
							</div>
							<div className="col">
								<select
									style={{
										width: "100%",
										height: "",
									}}
									className="form-control"
									onChange={handleClickProvince}
								>
									<option value={" "}>
										Chọn Quận/Huyện
									</option>
									{dataListProvince !== " "
										? dataListProvince.map(
												(el, index) => {
													return (
														<option
															key={
																index
															}
															value={
																el.Id
															}
														>
															{
																el.Name
															}
														</option>
													);
												}
										  )
										: null}
								</select>
							</div>
							<div className="col">
								<select
									style={{
										width: "100%",
										height: "",
										marginBottom: "40px",
									}}
									className="form-control"
									onChange={handleClickWard}
								>
									<option value={" "}>
										Chọn Phường/Xã
									</option>
									{dataListWards !== " "
										? dataListWards.map(
												(el, index) => {
													return (
														<option
															key={
																index
															}
															value={
																el.Id
															}
														>
															{
																el.Name
															}
														</option>
													);
												}
										  )
										: null}
								</select>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col d-flex align-items-center">
								<Link to="#" className="">
									Giỏ hàng
								</Link>
							</div>
							<div className="col">
								<button
									className="btn btn-dark button-step-footer"
									type="submit"
								>
									Tiếp tục đến phương thức thanh toán
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col col-right ps-5 pt-5 rounded shadow">
					<table className="table">
						<tbody>
							{cartStore.cart &&
							cartStore.cart.length > 0 ? (
								cartStore.cart.map((item, index) => {
									return (
										<tr key={index}>
											<td className="cart-product-img">
												<img
													src={
														item._id
															.description
															.imageList[0]
													}
													alt=""
													className="border"
												></img>
											</td>
											<td className="cart-product-content">
												<p className="cart-name-size">
													<Link
														to={`/product/${item._id._id}`}
														className="d-block"
													>
														{
															item
																._id
																.nameProduct
														}
													</Link>
													<span>
														{
															item.size
														}
													</span>
												</p>
												<div className="d-flex justify-content-between cart-price-qty">
													<span className="cart-qty">
														{item.qty}
													</span>
													<div className="fw-bold">{`${item.total},000đ`}</div>
												</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td className="text-center">
										Không có sp
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<div className="row py-3 border-bottom">
						<div className="col d-flex justify-content-center">
							<input
								type="text"
								className="form-control voucher-input"
								placeholder="Mã giảm giá"
							></input>
						</div>
						<div className="col-3">
							<button className="btn btn-secondary">
								Sử dụng
							</button>
						</div>
					</div>
					<div className="row py-3 border-bottom">
						<div className="col d-flex justify-content-start">
							<p className="fs-5">Khách hàng thân thiết</p>
						</div>
						<div className="col-3">
							<button className="btn btn-dark">
								Đăng nhập
							</button>
						</div>
					</div>
					<table className="table table-borderless">
						<tbody>
							<tr>
								<td>Tạm tính</td>
								<td>Price</td>
							</tr>
							<tr className="border-bottom">
								<td>Phí vận chuyển</td>
								<td>--</td>
							</tr>
							<tr>
								<td>Tổng cộng</td>
								<td>Price</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default globalStateAndAction(Checkout);
