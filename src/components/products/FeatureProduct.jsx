import React from "react";
import {FaHeart} from "react-icons/fa";
import {IoEyeSharp} from "react-icons/io5";
import {FaShoppingCart} from "react-icons/fa";
import {Link} from "react-router-dom";
import Ratings from "../Ratings";

const FeatureProduct = () => {
  return (
    <div className="w-[85%] mx-auto flex flex-wrap pb-10">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col md-lg:text-3xl text-4xl text-blue-600 font-bold relative md-lg:py-5 py-10">
          <h2>Feature Products</h2>
          <div className="w-[150px] h-[4px] bg-main mt-2"></div>
        </div>
        <div className="w-full grid grid-cols-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <div className="group transition-all duration-500 hover:shadow-lg hover:-mt-2 rounded-md mb-5">
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
                  <Link className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                    <IoEyeSharp />
                  </Link>
                  <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                    <FaShoppingCart />
                  </span>
                </div>
              </div>
              <div className="py-2 px-4 text-blue-600">
                <h2 className="text-center font-semibold text-lg">
                  Iphone 15 ProMax
                </h2>
                <div className="flex justify-center my-3">
                  <Ratings ratings={4} />
                </div>
                <div className="flex justify-center p-2 bg-main text-white rounded-md text-lg font-semibold">
                  $1234
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
