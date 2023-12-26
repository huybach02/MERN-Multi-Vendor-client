import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useLocation, Link} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import {IoStorefront} from "react-icons/io5";

const Shipping = () => {
  // const {state} = useLocation();
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });
  const [res, setRes] = useState(false);

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, address, phone, post, province, city, area} = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  return (
    <div>
      <Header />
      <section className="w-[85%] mx-auto rounded-md bg-main h-[220px] mt-6 md-lg:mt-0 bg-cover bg-no-repeat relative">
        <div className="absolute left-0 top-0 h-full w-full text-white">
          <div className="flex flex-col justify-center items-center gap-1 h-full w-full">
            <div className="py-10 px-16 bg-gray-300/20 rounded-md flex flex-col items-center">
              <h2 className="text-3xl md-lg:text-xl font-semibold uppercase">
                Shipping
              </h2>
              <div className="flex md-lg:hidden items-center gap-2">
                <Link to={"/"}>Home</Link>
                <FaAngleDoubleRight />
                <span>Cart</span>
                <FaAngleDoubleRight />
                <span>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="w-[85%] py-6 mx-auto">
          <div className="w-full flex flex-wrap">
            <div className="w-[70%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="p-6 shadow-md rounded-md">
                  {!res && (
                    <>
                      <h2 className="text-blue-600 font-semibold pb-3 text-lg">
                        Shipping Information
                      </h2>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="flex md-lg:flex-col md-lg:gap-2 w-full gap-5 text-blue-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="name"
                              placeholder="Enter your name"
                              id="name"
                              onChange={handleInput}
                              value={state.name}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="address"
                              placeholder="Enter your address"
                              id="address"
                              onChange={handleInput}
                              value={state.address}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex md-lg:flex-col md-lg:gap-2 w-full gap-5 text-blue-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="phone"
                              placeholder="Enter your phone"
                              id="phone"
                              onChange={handleInput}
                              value={state.phone}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">Post</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="post"
                              placeholder="Enter your post"
                              id="post"
                              onChange={handleInput}
                              value={state.post}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex md-lg:flex-col md-lg:gap-2 w-full gap-5 text-blue-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Province</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="province"
                              placeholder="Enter your province"
                              id="province"
                              onChange={handleInput}
                              value={state.province}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="city"
                              placeholder="Enter your city"
                              id="city"
                              onChange={handleInput}
                              value={state.city}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex md-lg:flex-col md-lg:gap-2 w-full gap-5 text-blue-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area">Area</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-blue-600 outline-none rounded-md"
                              name="area"
                              placeholder="Enter your area"
                              id="area"
                              onChange={handleInput}
                              value={state.area}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 my-3 w-full">
                          <button className="w-full py-2 bg-main rounded-md">
                            Save
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1 mt-5">
                      <h2 className="text-blue-600 font-semibold pb-3 text-lg">
                        Deliver To {state.name}
                      </h2>
                      <p className="flex items-center justify-between mb-3 md-lg:flex-col">
                        <span className="flex items-center gap-3">
                          <span className="text-blue-600 bg-main px-5 py-1 rounded-md">
                            Address:
                          </span>
                          <span>
                            {state.address} {state.province} {state.city}{" "}
                            {state.area}
                          </span>
                        </span>
                        <span
                          className="hover:underline cursor-pointer font-semibold text-blue-600"
                          onClick={() => setRes(false)}
                        >
                          Change
                        </span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="text-blue-600 bg-main px-5 py-1 rounded-md">
                          Email to:
                        </span>
                        <p>bach@gmail.com</p>
                      </p>
                    </div>
                  )}
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
                        <div className="flex items-center justify-end w-6/12 sm:w-full sm:mt-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h2 className="line-through md-lg:text-sm">
                                $1234
                              </h2>
                              <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                $1000
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[30%] md-lg:w-full">
              <div className="ml-3 md-lg:ml-0 bg-white shadow-md font-medium p-5 text-slate-600 flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center">
                  <span>Items Total</span>
                  <span>$855</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span>$85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Payment</span>
                  <span>$855</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>$955</span>
                </div>
                <button
                  disabled={res ? false : true}
                  className={`px-5 py-2 rounded-md hover:shadow-lg ${
                    res ? "bg-main" : "bg-gray-400"
                  } text-sm text-white uppercase`}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
