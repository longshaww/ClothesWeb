import globalStateAndAction from "../../../container/global.state.action";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosMethod from "../../../middlewares/axios";
import Toast from "../../../utils/toast";

function PaymentSuccess({ setCart }) {
	const { payment } = useParams();
	const navigate = useNavigate();
	const customer = JSON.parse(localStorage.getItem("customer"));

	useEffect(() => {
		if (!customer) {
			navigate("/checkout");
			Toast.fire({
				title: "Bạn chưa nhập thông tin thanh toán",
				icon: "warning",
			});
		}
		async function postBill() {
			customer.paymentMethod = payment;
			const res = await axiosMethod("bill", "post", customer);
			if (res.success) {
				Toast.fire({
					title: "Thanh toán thành công",
					icon: "success",
				});
				localStorage.removeItem("customer");
			}
		}
		postBill();
		// async function getCart() {
		// 	const data = await axiosMethod("cart", "get");
		// 	const cartQty = data.cart.reduce((a, b) => {
		// 		return a + b.qty;
		// 	}, 0);

		// 	const cartTotal = data.cart.reduce((a, b) => {
		// 		return a + b._id.price * b.qty;
		// 	}, 0);
		// 	setCart(cartQty, data, cartTotal);
		// }
		// getCart();
	}, [customer]);
	return <h2>Success</h2>;
}

export default globalStateAndAction(PaymentSuccess);
