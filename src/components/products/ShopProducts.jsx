import React from "react";
import Ratings from "../Ratings";
import {FaHeart} from "react-icons/fa";
import {IoEyeSharp} from "react-icons/io5";
import {FaShoppingCart} from "react-icons/fa";
import {Link} from "react-router-dom";

const ShopProducts = () => {
  return (
    <div
      className={`w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 gap-3`}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
        <div
          key={index}
          className="group transition-all duration-500 hover:shadow-lg hover:-mt-2 rounded-md mb-5"
        >
          <div className="relative overflow-hidden">
            <div className="bg-red-400 flex items-center justify-center absolute text-white py-3 px-2 rounded-full left-1 top-1 font-semibold">
              -10%
            </div>
            <img
              src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png"
              alt=""
              className="w-full"
            />
            <div className="absolute top-5  flex flex-col gap-2 -right-full group-hover:right-1 transition-all duration-500">
              <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                <FaHeart />
              </span>
              <Link
                to={`/product/details/123`}
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
              to={`/product/details/123`}
              className="flex justify-center font-semibold text-lg"
            >
              Iphone 15 ProMax
            </Link>
            <div className="flex justify-center mt-3 mb-5">
              <Ratings ratings={4} />
            </div>
            <div className="flex justify-center p-2 bg-main text-white rounded-md text-lg font-semibold">
              $1234
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
