import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {useState} from "react";

const CheckoutForm = ({orderId}) => {
  localStorage.setItem("orderId", orderId);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: "tabs",
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/order/confirm",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={submit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="px-10 py-2 bg-main rounded-md text-white"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div>Loading....</div> : "Pay now"}
        </span>
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
