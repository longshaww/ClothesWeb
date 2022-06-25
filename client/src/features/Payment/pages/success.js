import globalStateAndAction from "../../../container/global.state.action";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axiosMethod from "../../../middlewares/axios";
import Toast from "../../../utils/toast";
import BillComponent from "../../../components/Bill/bill";
import { useCookies } from "react-cookie";

function PaymentSuccess({ setCart }) {
	const { payment } = useParams();
	const customer = JSON.parse(localStorage.getItem("customer"));
	const voucher = localStorage.getItem("voucher");
	const [bill, setBill] = useState({});
	const [searchParams, setSearchParams] = useSearchParams();
	const [cookie] = useCookies(["user"]);
	const navigate = useNavigate();
	useEffect(() => {
		async function postBill() {
			const billParam = searchParams.get("bill");
			if (!customer) {
				Toast.fire({
					title: "Bạn chưa nhập thông tin",
					icon: "error",
				});
				return navigate("/checkout");
			}
			if (voucher) {
				customer.voucherID = voucher;
			}
			customer.paymentMethod = payment;
			const res = await axiosMethod("bill", "post", customer);
			if (!res.success) {
				return Toast.fire({
					title: "Đã xảy ra lỗi khi gửi bill",
					icon: "error",
				});
			}
			Toast.fire({
				title: "Thanh toán thành công",
				icon: "success",
			});
			localStorage.removeItem("customer");
			const cart = await axiosMethod("cart", "get");
			if (!cart.success) {
				return Toast.fire({
					title: "Đã xảy ra lỗi khi xóa giỏ hàng",
					icon: "error",
				});
			}
			setCart(cart.cartQty, cart, cart.cartTotal);
			setSearchParams({ bill: res.body._id });
			if (!billParam) {
				return Toast.fire({ title: "Lỗi params", icon: "error" });
			}
			const getBill = await axiosMethod(`bill/${billParam}`, "get");
			if (!getBill.success) {
				return Toast.fire({
					title: "Đã xảy rỗi khi get Bill",
					icon: "error",
				});
			}
			setBill(getBill.body);
		}
		postBill();
	}, [searchParams.get("bill")]);
	return <>{bill._id && <BillComponent bill={bill} />} </>;
}

export default globalStateAndAction(PaymentSuccess);
