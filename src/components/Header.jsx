import React, {useEffect} from "react";
import {FcGoogle} from "react-icons/fc";
import {IoMail} from "react-icons/io5";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaFacebook} from "react-icons/fa";
import {FaYoutube} from "react-icons/fa";
import {FaCaretDown} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";
import logo from "../assets/logo.png";
import {FaListUl} from "react-icons/fa6";
import {useState} from "react";
import {FaHeart} from "react-icons/fa";
import {FaShoppingCart} from "react-icons/fa";
import {IoCall} from "react-icons/io5";
import {FaCaretUp} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {get_categories} from "../store/reducers/homeReducer";

const Header = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {categories} = useSelector((state) => state.home);
  const {userInfo} = useSelector((state) => state.auth);
  const {cartProductCount, wishListCount} = useSelector((state) => state.cart);

  const user = false;
  const [showSidebar, setShowSidebar] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const searchProduct = () => {
    navigate(
      `/products/search?category=${category}&&searchValue=${searchValue}`
    );
  };

  const redirectToCart = () => {
    if (userInfo.id) {
      navigate("/cart");
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(get_categories());
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="header-top md-lg:hidden bg-[#eee]">
        <div className="w-[85%] mx-auto">
          <div className="flex w-full justify-between items-center h-[40px]">
            <ul className="flex items-center gap-8 text-sm">
              <li className="flex relative justify-center items-center gap-2 after:absolute after:h-[18px] after:w-[1px] after:bg-gray-500 after:-right-[16px]">
                <span>
                  <IoMail size={16} />
                </span>
                <span>hb-market@gmail.com</span>
              </li>
              <span>E-commerce Market</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4">
                  <Link>
                    <FcGoogle size={16} />
                  </Link>
                  <Link>
                    <FaFacebook size={18} color="#0866ff" />
                  </Link>
                  <Link>
                    <FaYoutube size={18} color="#f00" />
                  </Link>
                </div>
                <div className="flex cursor-pointer text-sm justify-center items-center gap-1 relative  before:absolute before:h-[18px] before:w-[1px] before:bg-gray-500 before:-left-[20px]">
                  {userInfo?.id ? (
                    <Link to={"/dashboard"} className="flex items-center gap-2">
                      <span>
                        <FaUserCircle size={20} />
                      </span>
                      <span>{userInfo.name}</span>
                    </Link>
                  ) : (
                    <Link to={"/login"} className="flex items-center gap-2">
                      <span>
                        <FaUserCircle size={20} />
                      </span>
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="w-[85%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap mt-3">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <div className="w-full flex justify-center md-lg:justify-normal">
                  <Link to={"/"} className="flex items-center">
                    <img
                      src={logo}
                      alt=""
                      className="w-[270px] flex items-center"
                    />
                  </Link>
                </div>
                <div
                  className="justify-center items-center w-[35px] h-[35px] bg-white border border-orange-600 rounded-md cursor-pointer lg:hidden md-lg:flex p-2 xl:hidden hidden text-orange-600"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <span>
                    <FaListUl size={20} />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex gap-16 items-center font-semibold uppercase md-lg:hidden text-lg">
                  <li>
                    <Link
                      to={"/"}
                      className={`block ${
                        pathname === "/"
                          ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                          : "pb-1"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/shop"}
                      className={`block ${
                        pathname === "/shop"
                          ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                          : "pb-1"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/blog"}
                      className={`block ${
                        pathname === "/blog"
                          ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                          : "pb-1"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      className={`block ${
                        pathname === "/about"
                          ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                          : "pb-1"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/contact"}
                      className={`block ${
                        pathname === "/contact"
                          ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                          : "pb-1"
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-gray-400/30">
                      <span title="Wishlist">
                        <FaHeart size={20} color="#ec3850" />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-blue-500 rounded-full text-white flex justify-center items-center -top-[6px] -right-[5px] text-[12px]">
                        {wishListCount}
                      </div>
                    </div>
                    <div
                      className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-gray-400/30"
                      onClick={redirectToCart}
                    >
                      <span title="My Cart">
                        <FaShoppingCart size={20} color="#284196" />
                      </span>
                      <div className="w-[24px] h-[20px] absolute bg-blue-500 rounded-full text-white flex justify-center items-center -top-[6px] -right-[5px] text-[10px]">
                        {cartProductCount > 99 ? "99+" : cartProductCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          className={`fixed duration-200 transition-all ${
            !showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-black/50 top-0 left-0 z-20`}
          onClick={() => setShowSidebar(false)}
        >
          <div
            className={`w-[270px] z-[99999] transition-all duration-300 fixed ${
              !showSidebar ? "-left-[300px]" : "left-0 top-0"
            } overflow-y-auto bg-white h-dvh p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3">
              <Link to={"/"} className="flex items-center">
                <img
                  src={logo}
                  alt=""
                  className="w-[270px] flex items-center"
                />
              </Link>
              <h2 className="text-center font-semibold">E-commerce Market</h2>
              <div className="flex items-center justify-center gap-10 py-3 border-t border-b border-gray-400/50">
                <div className="flex justify-center items-center gap-10">
                  {userInfo?.id ? (
                    <Link to={"/dashboard"} className="flex items-center gap-2">
                      <span>
                        <FaUserCircle size={20} />
                      </span>
                      <span>{userInfo?.name}</span>
                    </Link>
                  ) : (
                    <Link to={"/login"} className="flex items-center gap-2">
                      <span>
                        <FaUserCircle size={20} />
                      </span>
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-10 items-center font-semibold uppercase mt-5">
                <li>
                  <Link
                    to={"/"}
                    className={`block ${
                      pathname === "/"
                        ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                        : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/shop"}
                    className={`block ${
                      pathname === "/shop"
                        ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                        : ""
                    }`}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/blog"}
                    className={`block ${
                      pathname === "/blog"
                        ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                        : ""
                    }`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className={`block ${
                      pathname === "/about"
                        ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                        : ""
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className={`block ${
                      pathname === "/contact"
                        ? "text-blue-600 pb-1 border-b-4 border-blue-600"
                        : ""
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="flex justify-center items-center gap-5 my-5">
                <Link>
                  <FcGoogle size={18} />
                </Link>
                <Link>
                  <FaFacebook size={20} color="#0866ff" />
                </Link>
                <Link>
                  <FaYoutube size={20} color="#f00" />
                </Link>
              </div>
              <div className="w-full flex flex-col justify-end md-lg:justify-center gap-3 mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-full flex bg-gray-400/30 justify-center items-center">
                    <span>
                      <IoCall size={16} />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col text-sm">
                    <h2>0123456789</h2>
                    <span>Support 24/7 time</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-full flex bg-gray-400/30 justify-center items-center">
                    <span>
                      <IoMail size={16} />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col text-sm">
                    <h2>hb-market@gmail.com</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[85%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-3 mt-3">
          <div className="md-lg:w-full md-lg:flex hidden">
            <div className="w-full flex border border-blue-600 rounded-md h-[50px] items-center relative gap-5">
              <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-blue-600 after:-right-[15px] md-lg:hidden">
                <select
                  name=""
                  id=""
                  className="px-4 outline-none cursor-pointer font-semibold text-blue-600 h-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select Category
                  </option>
                  {categories?.length > 0 &&
                    categories?.map((item, index) => (
                      <option key={index} value={item.name} className="pb-2">
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type="text"
                className="w-full bg-transparent relative outline-none py-2 pl-4 pr-[90px] text-blue-600 font-semibold placeholder:text-[14px]"
                placeholder="Search products, brands, stores..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <button
                className="bg-main absolute right-0 px-3 h-full font-semibold text-sm uppercase rounded-r-md"
                onClick={searchProduct}
              >
                Search
              </button>
            </div>
          </div>
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                className="w-full h-[50px] mx-auto bg-main font-bold flex justify-between px-6 items-center  text-lg cursor-pointer uppercase rounded-md"
                onClick={() => setCategoryShow(!categoryShow)}
              >
                <div className="flex items-center gap-3">
                  <span>
                    <FaListUl size={24} />
                  </span>
                  <span>All Categories</span>
                </div>
                <div className="transition-all duration-500">
                  {!categoryShow ? (
                    <span>
                      <FaCaretDown size={24} />
                    </span>
                  ) : (
                    <span>
                      <FaCaretUp size={24} />
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`${
                  !categoryShow
                    ? "h-0 rounded-md text-white"
                    : "h-[500px] rounded-md bg-main"
                } w-full mt-1 overflow-hidden transition-all md-lg:relative duration-500 absolute z-50 py-2`}
              >
                <div className="font-medium flex flex-col overflow-y-auto h-[500px]">
                  {categories?.length > 0 &&
                    categories?.map((item, index) => (
                      <Link
                        to={`/products/${item.name}`}
                        key={index}
                        className="py-2 px-5 hover:bg-gray-400/50 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className={`w-[40px] h-[40px] overflow-hidden object-cover rounded-md ${
                            !categoryShow && "hidden"
                          }`}
                        />
                        {categoryShow ? item.name : ""}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:hidden flex">
                <div className="w-full flex border border-blue-600 rounded-md h-[50px] items-center relative gap-5">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-blue-600 after:-right-[15px] md-lg:hidden">
                    <select
                      name=""
                      id=""
                      className="px-4 outline-none cursor-pointer font-semibold text-blue-600 h-full"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" selected disabled>
                        Select Category
                      </option>
                      {categories?.length > 0 &&
                        categories?.map((item, index) => (
                          <option
                            key={index}
                            value={item.name}
                            className="pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    className="w-full bg-transparent relative outline-none py-2 pl-4 pr-[145px] text-blue-600 font-semibold"
                    placeholder="Search products, brands, stores..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  <button
                    className="bg-main absolute right-0 px-8 h-full font-semibold uppercase rounded-r-md"
                    onClick={searchProduct}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-4/12 md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0 flex justify-end">
                <div className="h-[50px] flex items-center gap-5   px-5 rounded-md">
                  <div className="w-[36px] h-[36px] rounded-full flex bg-gray-400/30 justify-center items-center">
                    <span>
                      <IoCall size={16} />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col  text-sm">
                    <h2>
                      <strong>Phone:</strong> 0123456789
                    </h2>
                    <strong>Support 24/7 time</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
