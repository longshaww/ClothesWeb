import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useEffect, useState } from "react";
import Toast from "../../../utils/toast";
import axiosMethod from "../../../middlewares/axios";

function ModalEditInfo({ setChangeInfo, changeInfo }) {
	const userLocal = localStorage.getItem("user_info");
	const [data, setData] = useState({});
	const [inputs, setInputs] = useState({
		nameCustomer: "",
		address: "",
		phoneNumber: "",
	});

	useEffect(() => {
		const data = changeInfo.listInfo.find(
			(el) => el._id === changeInfo.checkedInfo
		);
		if (!data) return;
		setData(data);
		setInputs({
			nameCustomer: data.nameCustomer,
			address: data.address,
			phoneNumber: data.phoneNumber,
		});
	}, [changeInfo.checkedInfo, changeInfo.listInfo]);

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
		const resInfo = await axiosMethod(
			`bill/info/${changeInfo.checkedInfo}`,
			"put",
			inputs
		);
		if (resInfo.success) {
			const index = changeInfo.listInfo.indexOf(data);
			const newList = [...changeInfo.listInfo];
			newList[index] = resInfo.body;
			setChangeInfo({
				...changeInfo,
				listInfo: newList,
				modalEdit: !changeInfo.modalEdit,
			});
			return Toast.fire({
				title: "Sửa thông tin thành công",
				icon: "success",
			});
		}
	};
	return (
		<Modal
			centered
			isOpen={changeInfo.modalEdit}
			toggle={() =>
				setChangeInfo({
					...changeInfo,
					modalEdit: !changeInfo.modalEdit,
				})
			}
		>
			<ModalHeader>Sửa địa chỉ {changeInfo.checkedInfo}</ModalHeader>
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
					Sửa
				</Button>
				<Button>Thoát</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ModalEditInfo;
