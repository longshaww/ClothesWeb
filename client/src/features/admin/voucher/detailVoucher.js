import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosMethod from "../../../middlewares/axios";
import VoucherComponent from "../../../components/voucher/voucher.component";

export default function DetailVoucher() {
	const [voucher, setVoucher] = useState({});
	const { id } = useParams();
	useEffect(() => {
		async function getVoucher() {
			const voucher = await axiosMethod(`voucher/${id}`, "get");
			if (voucher.success) {
				setVoucher(voucher.body);
			}
		}
		getVoucher();
	}, [id]);
	return (
		<>
			{voucher._id && (
				<div style={{ flex: 4 }}>
					<VoucherComponent voucher={voucher} />
				</div>
			)}
		</>
	);
}
