import React, {useEffect} from "react";
import Ratings from "../Ratings";
import {IoEyeSharp} from "react-icons/io5";
import {FaShoppingCart} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  add_to_cart,
  clearMessage,
  get_cart_products,
  get_wishlist_products,
  remove_wishlist_product,
} from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";
import {IoClose} from "react-icons/io5";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth);
  const {wishListProducts, errorMessage, successMessage} = useSelector(
    (state) => state.cart
  );

  const addToCart = (id) => {
    if (userInfo.id) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
      setTimeout(() => {
        dispatch(get_cart_products(userInfo.id));
      }, 200);
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  const removeWishlist = (id) => {
    dispatch(remove_wishlist_product(id));
  };

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo?.id));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
      dispatch(get_wishlist_products(userInfo?.id));
    }
  }, [errorMessage, successMessage]);

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-600 mb-5">My Wishlist</h2>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6">
        {wishListProducts?.length > 0 &&
          wishListProducts?.map((item, index) => (
            <div
              key={index}
              className="group transition-all duration-500 hover:shadow-lg hover:-mt-2 rounded-md mb-5"
            >
              <div className="relative overflow-hidden">
                {item.discount > 0 && (
                  <div className="bg-red-400 flex items-center justify-center absolute text-white py-3 px-2 rounded-full left-1 top-1 font-semibold">
                    -{item.discount}%
                  </div>
                )}
                <img src={item.image} alt="" className="w-full p-3" />
                <div className="absolute top-5  flex flex-col gap-2 -right-full group-hover:right-1 transition-all duration-500">
                  <span
                    className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110"
                    onClick={() => removeWishlist(item._id)}
                  >
                    <IoClose size={24} />
                  </span>
                  <Link
                    to={`/product/details/${item.slug}`}
                    className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110"
                  >
                    <IoEyeSharp />
                  </Link>
                  <span
                    className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110"
                    onClick={() => addToCart(item.productId)}
                  >
                    <FaShoppingCart />
                  </span>
                </div>
              </div>
              <div className="py-2 px-4 text-blue-600 flex flex-col justify-between">
                <Link
                  to={`/product/details/${item.slug}`}
                  className="flex justify-center font-semibold text-lg md-lg:text-sm"
                >
                  {item?.name?.length > 20
                    ? item.name.slice(0, 15) + "..."
                    : item.name}
                </Link>
                <div className="flex justify-center mt-3 mb-5">
                  <Ratings ratings={item.rating} />
                </div>
                <div className="flex justify-center p-2 bg-main text-white rounded-md text-lg font-semibold">
                  ${item.price}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Wishlist;
