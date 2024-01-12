import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaFacebookF, FaLinkedin} from "react-icons/fa";
import {AiFillGithub, AiOutlineTwitter} from "react-icons/ai";
import {useSelector} from "react-redux";
import {FaShoppingCart, FaHeart} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  const {cartProductCount, wishListCount} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);

  return (
    <footer className="bg-white border-t border-gray-400/30">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img className="w-[250px] h-[70x]" src={logo} alt="logo" />
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>
                <strong className="text-blue-600">Address :</strong> Sky View
                Center 40-24 College Point Blvd. STE B204 Flushing, NY,
                11354-5111, US
              </li>
              <li>
                <strong className="text-blue-600">Phone :</strong> 17183531694
              </li>
              <li>
                <strong className="text-blue-600">Email :</strong>{" "}
                hb-market@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2 text-blue-600">
                Useful links
              </h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-1">
            <h2 className="font-bold text-lg text-blue-600">Join Our</h2>
            <span>
              Get Email updates about our latest and shop specials offers
            </span>
            <div className="h-[50px] w-full bg-white border relative mt-3">
              <input
                placeholder="Enter your mail"
                className="h-full bg-transparent w-full px-3 outline-0"
                type="text"
              />
              <button className="h-full absolute right-0 bg-main text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <Link
                  clLinkssName="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <AiOutlineTwitter />
                </Link>
              </li>
              <li>
                <Link
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <AiFillGithub />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>Copiright ©2023 All rights reserved | made by HuyBach</span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2  rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <Link
            to={userInfo?.id ? "/cart" : "/login"}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-gray-400/30"
          >
            <span className="text-lg">
              <FaShoppingCart color="#284196" />
            </span>
            <div className="w-[20px] h-[20px] absolute bg-blue-500 rounded-full text-white flex justify-center items-center -top-[6px] -right-[5px] text-[10px]">
              {cartProductCount > 99 ? "99+" : cartProductCount}
            </div>
          </Link>
          <Link
            to={userInfo?.id ? "/dashboard/my-wishlist" : "/login"}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-gray-400/30"
          >
            <span className="text-lg">
              <FaHeart color="#ec3850" />
            </span>
            <div className="w-[20px] h-[20px] absolute bg-blue-500 rounded-full text-white flex justify-center items-center -top-[6px] -right-[5px] text-[10px]">
              {wishListCount}
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
