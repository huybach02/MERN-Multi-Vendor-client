import React from "react";
import {BsFillChatRightDotsFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSendFill} from "react-icons/bs";

const Chat = () => {
  return (
    <div className="bg-white rounded-md">
      <div className="w-full flex">
        <div className="w-[230px] md-lg:hidden">
          <div className="flex gap-3 items-center text-blue-600 text-xl h-[50px]">
            <span>
              <BsFillChatRightDotsFill size={26} />
            </span>
            <span className="text-2xl font-semibold">Message</span>
          </div>
          <div className="w-full flex flex-col text-blue-600 py-4 h-[400px] overflow-y-auto pr-3 p-3 border border-blue-600 rounded-md">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
              <Link className={`flex items-center gap-3 py-3`}>
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <span className="font-semibold">ABC Shop</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-240px)] md-lg:w-full">
          <div className="w-full h-full ml-3 md-lg:ml-0">
            <div className="flex items-center gap-3 text-blue-600 text-xl h-[50px]">
              <div className="w-[30px] h-[30px] rounded-full relative">
                <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                <img
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <span className="font-semibold">ABC Shop</span>
            </div>
            <div className="h-[400px] w-full bg-gray-400/20 rounded-md p-3">
              <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                <div className="w-full flex gap-2 items-center py-1">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <div className="p-2 bg-green-600/80 text-white rounded-md">
                    <span>How are you?</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 justify-end items-center py-1">
                  <div className="p-2 bg-blue-600/80 text-white rounded-md">
                    <span>Hello</span>
                  </div>
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    alt=""
                    className="w-10 h-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex p-2 justify-between items-center w-full">
              <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full border-blue-600">
                <label htmlFor="file" className="text-blue-600 cursor-pointer">
                  <FaPlus size={20} />
                </label>
                <input type="file" name="" id="file" hidden />
              </div>
              <div className="border border-blue-600 h-[50px] w-[calc(100%-50px)] rounded-md relative">
                <input
                  type="text"
                  placeholder="Enter your message"
                  className="w-full rounded-md h-full outline-none py-3 pl-3 pr-[120px]"
                />
                <div className="absolute top-1/2 right-1 translate-y-[-50%] text-blue-600">
                  <div className="flex items-center gap-5">
                    <span className="cursor-pointer">
                      <MdOutlineEmojiEmotions size={26} />
                    </span>
                    <span className="p-3 bg-main rounded-md cursor-pointer">
                      <BsSendFill size={20} />
                    </span>
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

export default Chat;
