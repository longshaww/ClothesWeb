import globalStateAndAction from "../../../container/global.state.action";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosMethod from "../../../middlewares/axios";
import Toast from "../../../utils/toast";
import BillComponent from "../../../components/Bill/bill";
import { useCookies } from "react-cookie";

function PaymentSuccess({ setCart }) {
	const { payment } = useParams();
	const customer = JSON.parse(localStorage.getItem("customer"));
	const [bill, setBill] = useState({});
	const [searchParams, setSearchParams] = useSearchParams();
	const [cookie] = useCookies(["user"]);
	useEffect(() => {
		async function postBill() {
			const billParam = searchParams.get("bill");
			if (customer) {
				customer.paymentMethod = payment;
				const res = await axiosMethod("bill", "post", customer);
				if (res.success) {
					Toast.fire({
						title: "Thanh toán thành công",
						icon: "success",
					});
					localStorage.removeItem("customer");
					const cart = await axiosMethod("cart", "get");
					if (cart.success) {
						setCart(cart.cartQty, cart, cart.cartTotal);
					}
					setSearchParams({ bill: res.body._id });
				}
			}
			if (billParam) {
				const getBill = await axiosMethod(
					`bill/${billParam}`,
					"get"
				);
				if (getBill.success) {
					setBill(getBill.body);
				}
			}
		}
		postBill();
	}, [searchParams.get("bill")]);
	return <>{bill._id && <BillComponent bill={bill} />} </>;
}

export default globalStateAndAction(PaymentSuccess);
