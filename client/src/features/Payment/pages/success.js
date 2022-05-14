import globalStateAndAction from "../../../container/global.state.action";
import { useEffect } from "react";
import axiosMethod from "../../../middlewares/axios";
function PaymentSuccess({ setCart }) {
	useEffect(() => {
		async function getCart() {
			localStorage.removeItem("customer");

			const data = await axiosMethod("cart", "get");
			const cartQty = data.cart.reduce((a, b) => {
				return a + b.qty;
			}, 0);

			const cartTotal = data.cart.reduce((a, b) => {
				return a + b._id.price * b.qty;
			}, 0);
			setCart(cartQty, data, cartTotal);
		}
		getCart();
	}, [setCart]);
	return <h2>Success</h2>;
}

export default globalStateAndAction(PaymentSuccess);
