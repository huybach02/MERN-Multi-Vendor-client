import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";
import {useLocation} from "react-router-dom";

const Payment = () => {
  const {
    state: {price, items, orderId},
  } = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <Header />
      <section className="">
        <div className="w-[85%] mx-auto bg-white py-10">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md-lg:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl text-blue-600 font-semibold">
                    Payment Method:
                  </span>
                  <div
                    className={`w-[20%] cursor-pointer py-4 px-8 ${
                      paymentMethod === "stripe"
                        ? "bg-gray-100 border border-blue-600 rounded-md"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <span className="text-lg font-semibold text-purple-500">
                        Stripe
                      </span>
                    </div>
                  </div>
                </div>
                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-10">
                <div className="bg-white shadow-md p-5 text-blue-600 flex flex-col gap-3 rounded-md">
                  <h2 className="text-2xl font-semibold">Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} products and shipping fee included</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-lg">Total Amount</span>
                    <span className="text-lg">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
