import globalStateAndAction from "../../../container/global.state.action";
import { Link } from "react-router-dom";
import "../../../assets/styles/checkout.css";
import { useState, useEffect } from "react";
import axiosMethod from "../../../middlewares/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Toast from "../../../utils/toast";
import ModalCreateInfo from "./modal.create.info";
import ModalEditInfo from "./modal.edit.info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DetailAddress from "./detail.address";
import { useCookies } from "react-cookie";

function CustomerInfo({ cart }) {
	const cartStore = cart.cartStore;
	const cartCount = cart.cartCount;
	const total = cart.total;
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);

	const [cookies] = useCookies(["user"]);

	const [detailAddress, setDetailAddress] = useState({
		city: "",
		province: "",
		ward: "",
		listProvince: [],
		listWard: [],
		listAddress: [],
	});

	const [inputs, setInputs] = useState({
		nameCustomer: "",
		email: "",
		phoneNumber: "",
		address: "",
		idDelivery: "",
		detailInputHidden: false,
	});

	const [changeInfo, setChangeInfo] = useState({
		view: false,
		modalCreate: false,
		modalEdit: false,
		listInfo: [],
		checkedInfo: cookies.user && cookies.user.id,
	});

	useEffect(() => {
		if (cartCount && cartCount === 0) {
			navigate("/");
		}
		if (cookies.user) {
			setInputs({
				...inputs,
				nameCustomer: cookies.user.information.name,
				email: cookies.user.email,
				phoneNumber: cookies.user.information.phoneNumber,
				address: cookies.user.information.address,
			});
		} else {
			setInputs({
				...inputs,
				nameCustomer: "",
				email: "",
				phoneNumber: "",
				address: "",
			});
		}

		async function fetchData() {
			const location = await axiosMethod("getLocation", "get");
			setDetailAddress({
				...detailAddress,
				listAddress: location,
			});

			if (cookies.user) {
				const listInfo = await axiosMethod(
					"bill/listInfo",
					"post",
					{
						userID: cookies.user.id,
					}
				);
				setChangeInfo({ ...changeInfo, listInfo: listInfo.body });
			}
		}
		fetchData();
	}, [cookies.user]);

	//Get inputs
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const validation = () => {
		if (!cookies.user) {
			if (
				!inputs.nameCustomer ||
				!inputs.email ||
				!inputs.phoneNumber ||
				!inputs.address ||
				!detailAddress.city ||
				!detailAddress.ward ||
				!detailAddress.province
			) {
				return true;
			}
		} else {
			if (
				!inputs.nameCustomer ||
				!inputs.email ||
				!inputs.phoneNumber ||
				!inputs.address ||
				!detailAddress.city ||
				!detailAddress.ward ||
				!detailAddress.province
			) {
				if (inputs.detailInputHidden) {
					return false;
				}
				return true;
			}
		}
	};

	//Submit Form
	const handleSubmit = (event) => {
		event.preventDefault();
		if (validation()) {
			return Toast.fire({
				title: "Vui lòng nhập đầy đủ thông tin !",
				icon: "warning",
			});
		}

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
			total,
		};
		if (cookies.user) {
			data.userID = cookies.user.id;
		}
		if (!inputs.address.includes("Phường")) {
			if (!inputs.address.includes("Xã")) {
				data.address = `${inputs.address} ${detailAddress.ward},${detailAddress.province},${detailAddress.city}`;
			}
		}

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

	const handleChangeInfo = () => {
		setChangeInfo({ ...changeInfo, view: !changeInfo.view });
	};

	const handleSubmitInfo = () => {
		const info = changeInfo.listInfo.find(
			(el) => el._id === changeInfo.checkedInfo
		);

		if (!info) {
			return Toast.fire({
				title: "Cập nhật thông tin thất bại",
				icon: "error",
			});
		}
		const data = {
			...info,
			email: cookies.user.email,
			id: cookies.user.id,
		};
		setInputs({
			...inputs,
			nameCustomer: data.nameCustomer,
			email: data.email,
			phoneNumber: data.phoneNumber,
			address: data.address,
			idDelivery: changeInfo.checkedInfo,
			detailInputHidden: !inputs.detailInputHidden,
		});
		Toast.fire({
			title: "Cập nhật thông tin thành công",
			icon: "success",
		});
	};

	const onDeleteInfoClick = async (id) => {
		if (cookies.user.id === id) {
			return Toast.fire({
				title: "Không thể xóa thông tin mặc định",
				icon: "warning",
			});
		}
		const deleteInfo = await axiosMethod(`bill/info/${id}`, "delete");
		if (deleteInfo.success) {
			const findById = changeInfo.listInfo.find((a) => a._id === id);
			const index = changeInfo.listInfo.indexOf(findById);
			setChangeInfo({
				...changeInfo,
				listInfo: [
					...changeInfo.listInfo.slice(0, index),
					...changeInfo.listInfo.slice(index + 1),
				],
			});
			Toast.fire({
				title: "Xóa thông tin thành công",
				icon: "success",
			});
		}
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
				{!cookies.user && (
					<p className="mt-3">
						Bạn đã có tài khoản ?
						<Link to="#"> Đăng nhập</Link>
					</p>
				)}

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
				{!inputs.detailInputHidden && (
					<DetailAddress
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
					/>
				)}

				{cookies.user && (
					<div class="form-check form-switch">
						<input
							class="form-check-input"
							type="checkbox"
							role="switch"
							id="changeInfoInput"
							onChange={handleChangeInfo}
						/>
						<label
							class="form-check-label"
							for="changeInfoInput"
						>
							Thay đổi thông tin giao hàng ?
						</label>
					</div>
				)}

				{changeInfo.view && cookies.user && (
					<div className="p-4 shadow mt-3 mb-5">
						<div className="d-flex fw-bold text-danger fs-5">
							<div>Địa chỉ nhận hàng</div>
							<button
								className="btn btn-outline-dark ms-auto"
								type="button"
								onClick={() =>
									setChangeInfo({
										...changeInfo,
										modalCreate:
											!changeInfo.modalCreate,
									})
								}
							>
								Thêm địa chỉ mới
							</button>
						</div>
						<ModalCreateInfo
							changeInfo={changeInfo}
							setChangeInfo={setChangeInfo}
							detailAddress={detailAddress}
							setDetailAddress={setDetailAddress}
						/>
						<ModalEditInfo
							changeInfo={changeInfo}
							setChangeInfo={setChangeInfo}
							detailAddress={detailAddress}
							setDetailAddress={setDetailAddress}
						/>
						<div className="py-3 my-4">
							{changeInfo.listInfo.length &&
								changeInfo.listInfo.map(
									(item, index) => (
										<div
											class="form-check mb-2"
											key={index}
										>
											<input
												class="form-check-input"
												type="radio"
												checked={
													changeInfo.checkedInfo ===
													item._id
												}
												onChange={() =>
													setChangeInfo({
														...changeInfo,
														checkedInfo:
															item._id,
													})
												}
												id={index}
											/>
											<label
												class="form-check-label row"
												for={index}
											>
												<div className="col fw-bold">
													{`${item.nameCustomer} ${item.phoneNumber}`}
												</div>
												<div className="col">
													{item.address}
												</div>
												<div className="col-3">
													<EditIcon
														style={{
															cursor: "pointer",
														}}
														onClick={() => {
															if (
																cookies
																	.user
																	.id ===
																item._id
															) {
																return Toast.fire(
																	{
																		title: "Không thể sửa thông tin mặc định",
																		icon: "warning",
																	}
																);
															}
															setChangeInfo(
																{
																	...changeInfo,
																	modalEdit:
																		!changeInfo.modalEdit,
																}
															);
														}}
													/>
													<DeleteIcon
														className="ms-2"
														style={{
															cursor: "pointer",
														}}
														onClick={() =>
															onDeleteInfoClick(
																item._id
															)
														}
													/>
												</div>
											</label>
										</div>
									)
								)}
						</div>

						<div className="text-center">
							<button
								className="btn btn-danger"
								type="button"
								onClick={handleSubmitInfo}
							>
								Hoàn thành
							</button>
						</div>
					</div>
				)}

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
