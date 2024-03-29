import React from "react";
import Ratings from "../Ratings";
import {FaHeart} from "react-icons/fa";
import {IoEyeSharp} from "react-icons/io5";
import {FaShoppingCart} from "react-icons/fa";
import {Link} from "react-router-dom";

const ShopProducts = ({products}) => {
  return (
    <div
      className={`w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 gap-3`}
    >
      {products?.length > 0 &&
        products?.map((item, index) => (
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
              <img src={item.images[0]} alt="" className="w-full p-3" />
              <div className="absolute top-5  flex flex-col gap-2 -right-full group-hover:right-1 transition-all duration-500">
                <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                  <FaHeart />
                </span>
                <Link
                  to={`/product/details/${item._id}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110"
                >
                  <IoEyeSharp />
                </Link>
                <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                  <FaShoppingCart />
                </span>
              </div>
            </div>
            <div className="py-2 px-4 text-blue-600">
              <Link
                to={`/product/details/${item._id}`}
                className="flex justify-center font-semibold text-lg"
              >
                {item.name}
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
  );
};

export default ShopProducts;
