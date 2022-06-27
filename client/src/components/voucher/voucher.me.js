import { useState, useEffect } from "react";
import axiosMethod from "../../middlewares/axios";
import VoucherComponent from "../../components/voucher/voucher.component";
import { useCookies } from "react-cookie";
export default function VoucherMe() {
	const [myVoucher, setMyVoucher] = useState([]);
	const [cookies] = useCookies(["user"]);
	useEffect(() => {
		async function getMyVoucher() {
			const myVoucher = await axiosMethod(
				`voucher/myVoucher/${cookies.user.id}`
			);
			if (myVoucher.success) {
				setMyVoucher(myVoucher.body);
			}
		}
		getMyVoucher();
	}, []);
	return (
		<>
			{myVoucher.length > 0 &&
				myVoucher.map((voucher) => {
					return <VoucherComponent voucher={voucher} />;
				})}
		</>
	);
}
