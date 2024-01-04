import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useLocation, Link, useNavigate} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import {IoStorefront} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {place_order} from "../store/reducers/orderReducer";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: {products, price, shipping_fee, items},
  } = useLocation();
  const {userInfo} = useSelector((state) => state.auth);

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

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
        items,
      })
    );
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
                {products.length > 0 &&
                  products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex shadow-md border border-blue-600 rounded-md p-4 flex-col gap-2 relative"
                    >
                      <div className="flex items-center mb-3">
                        <h2 className="text-md text-blue-600 font-semibold flex items-center gap-2">
                          <IoStorefront size={20} />
                          {item.shopName ||
                            item.product[0].productInfo.shopName}
                        </h2>
                      </div>
                      {item?.product?.map((i, index) => (
                        <div key={index} className="w-full flex flex-wrap">
                          <div className="flex sm:w-full gap-2 w-6/12">
                            <div className="flex gap-3 items-center">
                              <img
                                src={i.productInfo.images[0]}
                                alt=""
                                className="w-[80px]"
                              />
                              <div>
                                <h2 className="font-semibold text-lg text-blue-600">
                                  {i.productInfo.name}
                                </h2>
                                <span>Brand: {i.productInfo.brand}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end w-6/12 sm:w-full sm:mt-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="line-through md-lg:text-sm">
                                  ${i.productInfo.price}
                                </h2>
                                <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                  $
                                  {i.productInfo.price -
                                    (i.productInfo.price *
                                      i.productInfo.discount) /
                                      100}
                                </p>
                                <p>Quantity: {i.quantity}</p>
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
                  <span>${price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span>${shipping_fee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Payment</span>
                  <span>${price + shipping_fee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>${price + shipping_fee}</span>
                </div>
                <button
                  disabled={res ? false : true}
                  className={`px-5 py-2 rounded-md hover:shadow-lg ${
                    res ? "bg-main" : "bg-gray-400"
                  } text-sm text-white uppercase`}
                  onClick={placeOrder}
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
