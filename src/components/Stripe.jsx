import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import axios from "axios";
import {useState} from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OMmpZJMERio1zjviIO3czlfSOeFqdykTQTn3XmutLRuUXBxblI9TsupgEq2zMOvqzK4FbYYYBk63OgQXTBTRnsQ00O2tZpaHt"
);

const Stripe = ({price, orderId}) => {
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const options = {
    appearance: appearance,
    clientSecret,
  };

  const create_payment = async () => {
    try {
      const {data} = await axios.post(
        "http://localhost:5000/api/home/order/create-payment",
        {price},
        {withCredentials: true}
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="mt-5">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className="px-10 py-2 rounded-md bg-main text-white"
        >
          Start payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
