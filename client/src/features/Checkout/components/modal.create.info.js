import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useState } from "react";
import Toast from "../../../utils/toast";
import axiosMethod from "../../../middlewares/axios";

function ModalCreateInfo({ setChangeInfo, changeInfo }) {
	const userLocal = localStorage.getItem("user_info");
	const [inputs, setInputs] = useState({});
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};
	const handleSubmit = async () => {
		if (!inputs.nameCustomer || !inputs.address || !inputs.phoneNumber) {
			return Toast.fire({
				title: "Vui lòng kiểm tra lại thông tin",
				icon: "error",
			});
		}
		if (!userLocal) {
			return Toast.fire({
				title: "Lỗi",
				icon: "error",
			});
		}
		const user = JSON.parse(userLocal);
		const data = { ...inputs, userID: user.id };
		const resInfo = await axiosMethod("bill/info", "post", data);
		if (resInfo.success) {
			setChangeInfo({
				...changeInfo,
				listInfo: [...changeInfo.listInfo, resInfo.body],
				modalCreate: !changeInfo.modalCreate,
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
				<form className="d-flex flex-column p-5">
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
						className="form-control mt-3"
						name="phoneNumber"
						value={inputs.phoneNumber || ""}
						onChange={handleChange}
						placeholder="Số điện thoại"
					></input>
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
				<Button>Thoát</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ModalCreateInfo;
