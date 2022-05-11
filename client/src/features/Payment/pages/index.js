import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../../../App.css";
import PaymentForm from "./payment";
import axiosMethod from "../../../middlewares/axios";

const stripePromise = loadStripe(
	"pk_test_51KwO8iLbEwIz3CNxIsaozMfqDUhK14xf7Ll2TPNmcZ6pBouaTximDnXFumk6QkWrAcvTGfCJyMnOkrQ9XxIaAR2I00WiTHf5C1"
);

export default function OnlinePayment() {
	const [clientSecret, setClientSecret] = useState("");
	const customer = JSON.parse(localStorage.getItem("customer"));

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		async function getClientSecret() {
			if (!customer) return;
			const data = await axiosMethod(`create-payment-intent`, "post", {
				items: customer.listProduct,
			});
			setClientSecret(data.clientSecret);
		}
		getClientSecret();
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
			{clientSecret && customer ? (
				<Elements options={options} stripe={stripePromise}>
					<PaymentForm />
				</Elements>
			) : (
				<div>Error</div>
			)}
		</div>
	);
}
