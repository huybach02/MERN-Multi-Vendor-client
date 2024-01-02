import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {FaList} from "react-icons/fa6";
import {Link, Outlet} from "react-router-dom";
import {MdDashboard} from "react-icons/md";
import {GiPapers} from "react-icons/gi";
import {FaHeart} from "react-icons/fa";
import {BsChatRightDotsFill} from "react-icons/bs";
import {FaUserLock} from "react-icons/fa6";
import {RiLogoutBoxFill} from "react-icons/ri";

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div>
      <Header />
      <div className="bg-white">
        <div className="w-[85%] mx-auto md-lg:block hidden">
          <div>
            <button
              className="justify-center items-center w-[35px] h-[35px] bg-white border border-orange-600 rounded-md cursor-pointer p-2 text-orange-600"
              onClick={() => setFilterShow(!filterShow)}
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="w-[85%] md-lg:w-full h-full mx-auto">
          <div className="py-5 flex md-lg:w-[85%] mx-auto relative">
            <div
              className={`rounded-md z-40 md-lg:absolute ${
                filterShow ? "-left-4 " : "-left-[360px]"
              } w-[270px] bg-main h-fit`}
            >
              <ul className={`text-white py-2  px-4`}>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <MdDashboard size={24} />
                  </span>
                  <Link to={"/dashboard"} className="block">
                    Dashboard
                  </Link>
                </li>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <GiPapers size={24} />
                  </span>
                  <Link to={"/dashboard/my-orders"} className="block">
                    My Orders
                  </Link>
                </li>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <FaHeart size={24} />
                  </span>
                  <Link to={"/dashboard/my-wishlist"} className="block">
                    My Wishlist
                  </Link>
                </li>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <BsChatRightDotsFill size={24} />
                  </span>
                  <Link to={"/dashboard/chat"} className="block">
                    Chat
                  </Link>
                </li>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <FaUserLock size={24} />
                  </span>
                  <Link to={"/dashboard/change-password"} className="block">
                    Change Password
                  </Link>
                </li>
                <li className="flex items-center gap-3 py-3 text-xl font-semibold">
                  <span>
                    <RiLogoutBoxFill size={24} />
                  </span>
                  <button to={"/dashboard/change-password"} className="block">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
