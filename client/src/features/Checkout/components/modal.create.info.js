import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useState } from "react";
import Toast from "../../../utils/toast";
import axiosMethod from "../../../middlewares/axios";
import DetailAddress from "./detail.address";
import { useCookies } from "react-cookie";

function ModalCreateInfo({
	setChangeInfo,
	changeInfo,
	detailAddress,
	setDetailAddress,
}) {
	const [cookies] = useCookies(["user"]);
	const [inputs, setInputs] = useState({});
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};
	const handleSubmit = async () => {
		if (
			!inputs.nameCustomer ||
			!inputs.address ||
			!inputs.phoneNumber ||
			!detailAddress.city ||
			!detailAddress.ward ||
			!detailAddress.province
		) {
			return Toast.fire({
				title: "Vui lòng kiểm tra lại thông tin",
				icon: "error",
			});
		}
		if (!cookies.user) {
			return Toast.fire({
				title: "Lỗi",
				icon: "error",
			});
		}
		const data = { ...inputs, userID: cookies.user.id };
		data.address = `${inputs.address} ${detailAddress.ward},${detailAddress.province},${detailAddress.city}`;
		const resInfo = await axiosMethod("bill/info", "post", data);
		if (resInfo.success) {
			setChangeInfo({
				...changeInfo,
				listInfo: [...changeInfo.listInfo, resInfo.body],
				modalCreate: !changeInfo.modalCreate,
			});
			setDetailAddress({
				...detailAddress,
				city: "",
				province: "",
				ward: "",
			});
			return Toast.fire({
				title: "Thêm thông tin thành công",
				icon: "success",
			});
		}
	};
	return (
		<Modal
			centered
			size="lg"
			isOpen={changeInfo.modalCreate}
			toggle={() =>
				setChangeInfo({
					...changeInfo,
					modalCreate: !changeInfo.modalCreate,
				})
			}
		>
			<ModalHeader>Địa chỉ mới</ModalHeader>
			<ModalBody>
				<form className="d-flex flex-column p-4">
					<input
						type="text"
						className="form-control"
						name="nameCustomer"
						value={inputs.nameCustomer || ""}
						onChange={handleChange}
						placeholder="Tên"
					></input>
					<input
						type="text"
						className="form-control mt-3"
						name="address"
						value={inputs.address || ""}
						onChange={handleChange}
						placeholder="Địa chỉ"
					></input>
					<input
						type="text"
						className="form-control my-3"
						name="phoneNumber"
						value={inputs.phoneNumber || ""}
						onChange={handleChange}
						placeholder="Số điện thoại"
					></input>
					<DetailAddress
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
					/>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button
					color="primary"
					type="button"
					onClick={handleSubmit}
				>
					Thêm
				</Button>
				<Button
					onClick={() =>
						setChangeInfo({
							...changeInfo,
							modalCreate: !changeInfo.modalCreate,
						})
					}
				>
					Thoát
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ModalCreateInfo;
