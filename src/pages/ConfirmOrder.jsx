import React from "react";
import {Link} from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {useState} from "react";
import {useEffect} from "react";
import success from "../assets/success.png";
import error from "../assets/error.png";

const load = async () => {
  return await loadStripe(
    "pk_test_51OMmpZJMERio1zjviIO3czlfSOeFqdykTQTn3XmutLRuUXBxblI9TsupgEq2zMOvqzK4FbYYYBk63OgQXTBTRnsQ00O2tZpaHt"
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(
          `http://localhost:5000/api/home/order/confirm/${orderId}`
        );
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <div className="flex flex-col items-center gap-5">
          <img src={error} alt="" className="w-28 h-28" />
          <span className="text-xl font-semibold text-red-600">
            Something went wrong! Please try again later!
          </span>
          <Link
            to={`/dashboard/my-orders`}
            className="px-10 py-2 bg-main rounded-md text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : message === "succeeded" ? (
        loader ? (
          <PuffLoader />
        ) : (
          <div className="flex flex-col items-center gap-5">
            <img src={success} alt="" className="w-28 h-28" />
            <span className="text-xl font-semibold text-green-600">
              Successfully
            </span>
            <Link
              to={`/dashboard/my-orders`}
              className="px-10 py-2 bg-main rounded-md text-white"
            >
              Back to Dashboard
            </Link>
          </div>
        )
      ) : (
        <PuffLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
