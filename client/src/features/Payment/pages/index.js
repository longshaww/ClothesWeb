import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../../../App.css";
import CheckoutForm from "./checkout";
import axiosMethod from "../../../middlewares/axios";

const stripePromise = loadStripe(
	"pk_test_51KwO8iLbEwIz3CNxIsaozMfqDUhK14xf7Ll2TPNmcZ6pBouaTximDnXFumk6QkWrAcvTGfCJyMnOkrQ9XxIaAR2I00WiTHf5C1"
);

export default function IndexCheckout() {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		const data = axiosMethod(`create-payment-intent`, "post", {
			items: [{ id: "xl-tshirt" }],
		});
		setClientSecret(data.clientSecret);
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="App">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
