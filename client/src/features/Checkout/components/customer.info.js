import globalStateAndAction from "../../../container/global.state.action";
import { Link } from "react-router-dom";
import "../../../assets/styles/checkout.css";
import { useState, useEffect } from "react";
import axiosMethod from "../../../middlewares/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CustomerInfo({ cart }) {
	const cartStore = cart.cartStore;
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);
	const [data, setData] = useState([]);
	const [dataCity, setDataCity] = useState();
	const [dataListProvince, setListProvince] = useState([]);
	const [dataProvince, setProvince] = useState();
	const [dataListWards, setListWards] = useState([]);
	const [dataWard, setWard] = useState([]);

	const [inputs, setInputs] = useState({});

	useEffect(() => {
		async function fetchData() {
			const location = await axiosMethod("getlocation", "get");
			setData(location);
		}
		fetchData();
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
			setListWards(listWards);
		} else {
			setProvince(" ");
			setListWards(" ");
		}
	};

	//Get inputs
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const validation = () => {
		if (
			!inputs.nameCustomer ||
			!inputs.email ||
			!inputs.phoneNumber ||
			!inputs.address
		)
			return true;
	};
	//Submit Form
	const handleSubmit = (event) => {
		event.preventDefault();

		if (validation()) return;
		const data = {
			...inputs,
			listProduct: cartStore.cart.map((el) => {
				return {
					_id: el._id._id,
					size: el.size,
					qty: el.qty,
					sum: el.total,
				};
			}),
		};
		localStorage.setItem("customer", JSON.stringify(data));
		MySwal.fire({
			title: <p>Chuyển đến trang phương thức thanh toán</p>,
			didOpen: () => {
				MySwal.showLoading();
			},
			timer: 1000,
		}).then(() => {
			navigate("/checkout/method");
		});
	};

	const handleClickWard = (event) => {
		setWard(event.target.value);
	};
	return (
		<>
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
					Bạn đã có tài khoản ?<Link to="#"> Đăng nhập</Link>
				</p>
				<input
					type="text"
					name="nameCustomer"
					value={inputs.nameCustomer || ""}
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
									<option key={index} value={el.Id}>
										{el.Name}
									</option>
								);
							})}
						</select>
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
							<option value={" "}>Chọn Quận/Huyện</option>
							{dataListProvince !== " "
								? dataListProvince.map((el, index) => {
										return (
											<option
												key={index}
												value={el.Id}
											>
												{el.Name}
											</option>
										);
								  })
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
							<option value={" "}>Chọn Phường/Xã</option>
							{dataListWards !== " "
								? dataListWards.map((el, index) => {
										return (
											<option
												key={index}
												value={el.Id}
											>
												{el.Name}
											</option>
										);
								  })
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
		</>
	);
}

export default globalStateAndAction(CustomerInfo);
