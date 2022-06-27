import { useEffect, useState } from "react";
import axiosMethod from "../../../middlewares/axios";
import VoucherComponent from "../../../components/voucher/voucher.component";
export default function Sale() {
	const [listVoucher, setListVoucher] = useState([]);
	useEffect(() => {
		async function getListVoucher() {
			const vouchers = await axiosMethod("voucher", "get");
			if (vouchers.success) {
				setListVoucher(vouchers.body);
			}
		}
		getListVoucher();
	}, []);
	return (
		<>
			{listVoucher.length > 0 &&
				listVoucher.map((voucher) => {
					return <VoucherComponent voucher={voucher} />;
				})}
		</>
	);
}
