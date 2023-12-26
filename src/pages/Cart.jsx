import React from "react";
import Header from "../components/Header";
import {Link, useNavigate} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import Footer from "../components/Footer";
import {IoStorefront} from "react-icons/io5";

const Cart = () => {
  const navigate = useNavigate();

  const cart_products = 9;
  const outOfStockProduct = 2;

  const handleRedirect = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 5000,
        shipping_fee: 10,
        item: 4,
      },
    });
  };

  return (
    <div>
      <Header />
      <section className="w-[85%] mx-auto rounded-md bg-main h-[220px] mt-6 md-lg:mt-0 bg-cover bg-no-repeat relative">
        <div className="absolute left-0 top-0 h-full w-full text-white">
          <div className="flex flex-col justify-center items-center gap-1 h-full w-full">
            <div className="py-10 px-16 bg-gray-300/20 rounded-md flex flex-col items-center">
              <h2 className="text-3xl font-semibold">MY CART</h2>
              <div className="flex items-center gap-2">
                <Link to={"/"}>Home</Link>
                <FaAngleDoubleRight />
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="w-[85%] py-6 mx-auto">
          {cart_products > 0 || outOfStockProduct > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[70%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="shadow-md p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products: {cart_products - outOfStockProduct}
                      </h2>
                    </div>
                    {[1, 2, 3, 4].map((item, index) => (
                      <div
                        key={index}
                        className="flex shadow-md border border-blue-600 rounded-md p-4 flex-col gap-2 relative"
                      >
                        <div className="flex items-center mb-3">
                          <h2 className="text-md text-blue-600 font-semibold flex items-center gap-2">
                            <IoStorefront size={20} />
                            ABC Shop
                          </h2>
                        </div>
                        {[1, 2].map((item, index) => (
                          <div key={index} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-6/12">
                              <div className="flex gap-3 items-center">
                                <img
                                  src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png"
                                  alt=""
                                  className="w-[80px]"
                                />
                                <div>
                                  <h2 className="font-semibold text-lg text-blue-600">
                                    Iphone 15 ProMax
                                  </h2>
                                  <span>Brand: Apple</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between w-6/12 sm:w-full sm:mt-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                <p className="w-[45px] h-[45px] flex items-center justify-center bg-red-400 rounded-full text-white text-sm md-lg:absolute md-lg:top-2 md-lg:right-2">
                                  -99%
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h2 className="line-through md-lg:text-sm">
                                    $1234
                                  </h2>
                                  <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                    $1000
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-main h-[34px] justify-center items-center rounded-md">
                                  <div className="px-3 cursor-pointer border-r border-white">
                                    -
                                  </div>
                                  <div className="px-3">5</div>
                                  <div className="px-3 cursor-pointer border-l border-white">
                                    +
                                  </div>
                                </div>
                                <button className="px-3 py-1 rounded-md bg-red-500 text-white">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStockProduct > 0 && (
                      <div className="flex flex-col gap-3 ">
                        <div className="shadow-md p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock Products: {outOfStockProduct}
                          </h2>
                        </div>
                        <div>
                          <div className="flex shadow-md border border-blue-600 rounded-md p-4 flex-col gap-2 relative">
                            <div className="flex items-center mb-3">
                              <h2 className="text-md text-blue-600 font-semibold flex items-center gap-2">
                                <IoStorefront size={20} />
                                ABC Shop
                              </h2>
                            </div>
                            {[1, 2].map((item, index) => (
                              <div
                                key={index}
                                className="w-full flex flex-wrap"
                              >
                                <div className="flex sm:w-full gap-2 w-6/12">
                                  <div className="flex gap-3 items-center">
                                    <img
                                      src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png"
                                      alt=""
                                      className="w-[80px]"
                                    />
                                    <div>
                                      <h2 className="font-semibold text-lg text-blue-600">
                                        Iphone 15 ProMax
                                      </h2>
                                      <span>Brand: Apple</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between w-6/12 sm:w-full sm:mt-3">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <p className="w-[45px] h-[45px] flex items-center justify-center bg-red-400 rounded-full text-white text-sm md-lg:absolute md-lg:top-2 md-lg:right-2">
                                      -99%
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h2 className="line-through md-lg:text-sm">
                                        $1234
                                      </h2>
                                      <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                        $1000
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 flex-col">
                                    <div className="flex bg-main h-[34px] justify-center items-center rounded-md">
                                      <div className="px-3 cursor-pointer border-r border-white">
                                        -
                                      </div>
                                      <div className="px-3">5</div>
                                      <div className="px-3 cursor-pointer border-l border-white">
                                        +
                                      </div>
                                    </div>
                                    <button className="px-3 py-1 rounded-md bg-red-500 text-white">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[30%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products > 0 && (
                    <div className="shadow-md p-4 rounded-md text-blue-600 flex flex-col">
                      <h2 className="text-2xl font-semibold mb-5">
                        Order Summary
                      </h2>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">4 items</span>
                        <span>$1234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Shipping Fee</span>
                        <span>$10</span>
                      </div>
                      <div className="w-full my-5 flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="Enter your coupon"
                          className="border border-blue-600 p-2 rounded-md outline-none w-[80%]"
                        />
                        <button className="py-2 w-[20%] bg-main rounded-md">
                          Apply
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl">Total</span>
                        <span className="text-xl font-semibold">$1244</span>
                      </div>
                      <button
                        className="bg-main rounded-md py-2 mt-5 hover:shadow-md uppercase"
                        onClick={handleRedirect}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Link to={"/shop"} className="py-3 px-5 rounded-md bg-main">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
