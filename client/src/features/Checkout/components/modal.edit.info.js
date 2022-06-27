import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useEffect, useState } from "react";
import Toast from "../../../utils/toast";
import axiosMethod from "../../../middlewares/axios";
import DetailAddress from "./detail.address";
import { handleAddress } from "../../../middlewares/handle.address";
import { useCookies } from "react-cookie";

function ModalEditInfo({
	setChangeInfo,
	changeInfo,
	detailAddress,
	setDetailAddress,
}) {
	const [cookies] = useCookies(["user"]);
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
		inputs.address = `${handleAddress(inputs.address)} ${
			detailAddress.ward
		},${detailAddress.province},${detailAddress.city}`;

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
			setDetailAddress({
				...detailAddress,
				city: "",
				province: "",
				ward: "",
			});
			return Toast.fire({
				title: "Sửa thông tin thành công",
				icon: "success",
			});
		}
	};
	return (
		<Modal
			size="lg"
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
					Sửa
				</Button>
				<Button
					onClick={() =>
						setChangeInfo({
							...changeInfo,
							modalEdit: !changeInfo.modalEdit,
						})
					}
				>
					Thoát
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ModalEditInfo;
