import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { validateVoucher } from "../../../utils/validate.voucher";
import Toast from "../../../utils/toast";
import axiosMethod from "../../../middlewares/axios";
import { useNavigate } from "react-router-dom";

export default function CreateVoucher() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		discount: "",
		dateStart: moment(new Date()).format("YYYY/MM/DD"),
		dateEnd: moment(new Date()).format("YYYY/MM/DD"),
		maxDiscount: "",
		qualifyAmount: "",
		qty: "",
	});
	const handleDateStartChange = (newValue) => {
		setInputs({
			...inputs,
			dateStart: moment(newValue).format("YYYY/MM/DD"),
		});
	};
	const handleDateEndChange = (newValue) => {
		setInputs({
			...inputs,
			dateEnd: moment(newValue).format("YYYY/MM/DD"),
		});
	};
	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateVoucher(inputs)) {
			const newVoucher = await axiosMethod("voucher", "post", inputs);
			if (newVoucher.success) {
				Toast.fire({
					title: "Tạo voucher thành công",
					icon: "success",
				});
				navigate("/admin/vouchers");
			}
		}
	};

	return (
		<div style={{ flex: 4 }} className="p-5 shadow mx-3">
			<h3 className="mb-3">Create voucher</h3>
			<form onSubmit={handleSubmit}>
				<Box sx={{ marginBottom: 3 }}>
					<TextField
						id="outlined-basic"
						label="Discount"
						onChange={handleInputChange}
						value={inputs.discount}
						name="discount"
						variant="outlined"
						fullWidth
						type="number"
					/>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						marginBottom: 3,
					}}
				>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DatePicker
							label="Ngày bắt đầu"
							inputFormat="DD/MM/YYYY"
							value={inputs.dateStart}
							onChange={handleDateStartChange}
							renderInput={(params) => (
								<TextField {...params} />
							)}
						/>
					</LocalizationProvider>

					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DatePicker
							label="Ngày kết thúc"
							inputFormat="DD/MM/YYYY"
							value={inputs.dateEnd}
							onChange={handleDateEndChange}
							renderInput={(params) => (
								<TextField {...params} />
							)}
						/>
					</LocalizationProvider>
				</Box>
				<Box sx={{ marginBottom: 3 }}>
					<TextField
						id="outlined-basic"
						label="Số tiền giảm tối đa"
						onChange={handleInputChange}
						value={inputs.maxDiscount}
						name="maxDiscount"
						variant="outlined"
						fullWidth
						type="number"
					/>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
					}}
				>
					<Box sx={{ marginRight: 2 }}>
						<TextField
							id="outlined-basic"
							label="Số tiền thỏa mãn điều kiện"
							onChange={handleInputChange}
							value={inputs.qualifyAmount}
							name="qualifyAmount"
							variant="outlined"
							fullWidth
							type="number"
						/>
					</Box>
					<TextField
						id="outlined-basic"
						label="Số lượng"
						onChange={handleInputChange}
						value={inputs.qty}
						name="qty"
						variant="outlined"
						type="number"
					/>
				</Box>
				<div className="text-center mt-5">
					<button className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
	);
}
