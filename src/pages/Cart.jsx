import React, {useEffect} from "react";
import Header from "../components/Header";
import {Link, useNavigate} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import Footer from "../components/Footer";
import {IoStorefront} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {
  delete_product_from_cart,
  get_cart_products,
  clearMessage,
  increment_quantity,
  reduce_quantity,
} from "../store/reducers/cartReducer";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  const {
    cartProducts,
    price,
    shippingFee,
    outOfStockProducts,
    buyProductItem,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.cart);

  const handleRedirect = () => {
    navigate("/shipping", {
      state: {
        products: cartProducts,
        price: price,
        shipping_fee: shippingFee,
        items: buyProductItem,
      },
    });
  };

  useEffect(() => {
    if (userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
      dispatch(get_cart_products(userInfo.id));
    }
  }, [errorMessage, successMessage]);

  const increment = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(increment_quantity(cartId));
    } else {
      toast.error("Exceed product quantity");
    }
  };
  const reduce = (quantity, cartId) => {
    const temp = quantity - 1;
    if (temp > 0) {
      dispatch(reduce_quantity(cartId));
    } else {
      toast.error("Quantity must be greater than 1");
    }
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
          {cartProducts.length > 0 || outOfStockProducts.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[70%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="shadow-md p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products
                      </h2>
                    </div>
                    {cartProducts?.map((item, index) => (
                      <div
                        key={index}
                        className="flex shadow-md border border-blue-600 rounded-md p-4 flex-col gap-2 relative"
                      >
                        <div className="flex items-center mb-3">
                          <h2 className="text-md text-blue-600 font-semibold flex items-center gap-2">
                            <IoStorefront size={20} />
                            {item.shopName}
                          </h2>
                        </div>
                        {item?.product?.map((i, index) => (
                          <div key={index} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-6/12">
                              <div className="flex gap-3 items-center">
                                <img
                                  src={i.productInfo.images[0]}
                                  alt=""
                                  className="w-[80px] p-3"
                                />
                                <div>
                                  <h2 className="font-semibold text-lg text-blue-600">
                                    {i.productInfo.name}
                                  </h2>
                                  <span>Brand: {i.productInfo.brand}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between w-6/12 sm:w-full sm:mt-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                {i.productInfo.discount > 0 && (
                                  <p className="w-[45px] h-[45px] flex items-center justify-center bg-red-400 rounded-full text-white text-sm md-lg:absolute md-lg:top-2 md-lg:right-2">
                                    -{i.productInfo.discount}%
                                  </p>
                                )}
                                <div className="flex items-center gap-2 flex-wrap">
                                  {i.productInfo.discount > 0 && (
                                    <h2 className="line-through md-lg:text-sm">
                                      ${i.productInfo.price}
                                    </h2>
                                  )}
                                  <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                    $
                                    {i.productInfo.price -
                                      Math.floor(
                                        (i.productInfo.price *
                                          i.productInfo.discount) /
                                          100
                                      )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-main h-[34px] justify-center items-center rounded-md">
                                  <div
                                    className="px-3 cursor-pointer border-r border-white"
                                    onClick={() => reduce(i.quantity, i._id)}
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{i.quantity}</div>
                                  <div
                                    className="px-3 cursor-pointer border-l border-white"
                                    onClick={() =>
                                      increment(
                                        i.quantity,
                                        i.productInfo.stock,
                                        i._id
                                      )
                                    }
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  className="px-3 py-1 rounded-md bg-red-500 text-white"
                                  onClick={() =>
                                    dispatch(delete_product_from_cart(i._id))
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStockProducts?.length > 0 && (
                      <div className="flex flex-col gap-3 ">
                        <div className="shadow-md p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock Products
                          </h2>
                        </div>
                        <div>
                          {outOfStockProducts?.length > 0 &&
                            outOfStockProducts?.map((item, index) => (
                              <div
                                key={index}
                                className="flex shadow-md border border-blue-600 rounded-md p-4 flex-col gap-2 relative"
                              >
                                <div className="flex items-center mb-3">
                                  <h2 className="text-md text-blue-600 font-semibold flex items-center gap-2">
                                    <IoStorefront size={20} />
                                    {item.product[0].shopName}
                                  </h2>
                                </div>
                                {item?.product?.map((i, index) => (
                                  <div
                                    key={index}
                                    className="w-full flex flex-wrap"
                                  >
                                    <div className="flex sm:w-full gap-2 w-6/12">
                                      <div className="flex gap-3 items-center">
                                        <img
                                          src={i.images[0]}
                                          alt=""
                                          className="w-[80px]"
                                        />
                                        <div>
                                          <h2 className="font-semibold text-lg text-blue-600">
                                            {i.name}
                                          </h2>
                                          <span>Brand: {i.brand}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between w-6/12 sm:w-full sm:mt-3">
                                      <div className="flex items-center gap-3 flex-wrap">
                                        {i.discount > 0 && (
                                          <p className="w-[45px] h-[45px] flex items-center justify-center bg-red-400 rounded-full text-white text-sm md-lg:absolute md-lg:top-2 md-lg:right-2">
                                            -{i.discount}%
                                          </p>
                                        )}
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {i.discount > 0 && (
                                            <h2 className="line-through md-lg:text-sm">
                                              ${i.price}
                                            </h2>
                                          )}
                                          <p className="font-semibold md-lg:text-lg text-xl text-blue-600">
                                            $
                                            {i.price -
                                              Math.floor(
                                                (i.price * i.discount) / 100
                                              )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 flex-col">
                                        <div className="flex bg-main h-[34px] justify-center items-center rounded-md">
                                          <div
                                            className="px-3 cursor-pointer border-r border-white"
                                            onClick={() =>
                                              reduce(item.quantity, item._id)
                                            }
                                          >
                                            -
                                          </div>
                                          <div className="px-3">
                                            {item.quantity}
                                          </div>
                                          <div
                                            className="px-3 cursor-pointer border-l border-white"
                                            onClick={() =>
                                              increment(
                                                item.quantity,
                                                i.stock,
                                                item._id
                                              )
                                            }
                                          >
                                            +
                                          </div>
                                        </div>
                                        <button
                                          className="px-3 py-1 rounded-md bg-red-500 text-white"
                                          onClick={() =>
                                            dispatch(
                                              delete_product_from_cart(item._id)
                                            )
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[30%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cartProducts?.length > 0 && (
                    <div className="shadow-md p-4 rounded-md text-blue-600 flex flex-col">
                      <h2 className="text-2xl font-semibold mb-5">
                        Order Summary
                      </h2>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {buyProductItem} items
                        </span>
                        <span>${price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Shipping Fee</span>
                        <span>${shippingFee}</span>
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
                        <span className="text-xl font-semibold">
                          ${price + shippingFee}
                        </span>
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
