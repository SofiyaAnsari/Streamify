// SubscriptionForm.js

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./SubscriptionForm.css";

const SubscriptionForm = ({ selectedPlan }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [name, setName] = useState("");

	const calculateAmount = () => {
		return selectedPlan === "monthly" ? 10 : 100;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const amount = calculateAmount();

		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			console.log(error.message);
			return;
		}

		try {
			const response = await fetch("http://localhost:8800/create-payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					paymentMethodId: paymentMethod.id,
					name,
					amount,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				const clientSecret = data.clientSecret;
				const { error } = await stripe.confirmCardPayment(clientSecret);
				if (error) {
					console.error("Error confirming payment:", error);
				} else {
					window.location.href = "http://localhost:5173/home";
				}
			} else {
				console.log("Failed to process payment");
			}
		} catch (error) {
			console.error("Error processing payment:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name:</label> <br />
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Card Details:</label>
				<CardElement className="card-element" />
			</div>
			<button type="submit">Pay Now</button>
		</form>
	);
};

export default SubscriptionForm;
