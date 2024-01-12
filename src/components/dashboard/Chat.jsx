import React, {useEffect, useState} from "react";
import {BsFillChatRightDotsFill} from "react-icons/bs";
import {Link, useParams} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSendFill} from "react-icons/bs";
import {FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {
  add_friend,
  send_message,
  updateMessage,
  clearMessage,
} from "../../store/reducers/chatReducer";
import toast from "react-hot-toast";
import {useRef} from "react";

const socket = io("https://mern-multivendor-server.onrender.com");

const Chat = () => {
  const dispatch = useDispatch();

  const {sellerId} = useParams();

  const {userInfo} = useSelector((state) => state.auth);
  const {myFriends, friendMessages, currentFriend, successMessage} =
    useSelector((state) => state.chat);

  const scrollRef = useRef();
  const [showList, setShowList] = useState(false);
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  const sendMessage = () => {
    if (!text) {
      toast.error("Please enter something...");
    } else {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setTimeout(() => {
        setText("");
      }, 200);
    }
  };

  useEffect(() => {
    if (userInfo.id) {
      socket.emit("add_user", userInfo.id, userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.id) {
      dispatch(
        add_friend({
          sellerId: sellerId || "",
          userId: userInfo.id,
        })
      );
    }
  }, [sellerId]);

  socket.on("seller_message", (msg) => {
    setReceiverMessage(msg);
  });
  socket.on("activeSeller", (sellers) => {
    setActiveSeller(sellers);
  });

  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo.id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(`${receiverMessage.senderName} send a message`);
        dispatch(clearMessage());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_customer_message",
        friendMessages[friendMessages.length - 1]
      );
      dispatch(clearMessage());
    }
  }, [successMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [friendMessages]);

  return (
    <div className="bg-white rounded-md">
      <div className="w-full flex justify-end">
        <div
          className="w-fit flex items-center gap-3 bg-main p-3 justify-end rounded-md"
          onClick={() => setShowList(!showList)}
        >
          <FaUsers size={20} />
          <span className="text-lg font-semibold">List Seller</span>
        </div>
      </div>
      <div className="w-full flex">
        <div
          className={`w-[230px] bg-white md-lg:fixed z-40 ${
            showList ? "md-lg:visible" : "md-lg:invisible"
          }`}
        >
          <div className="flex gap-3 items-center text-blue-600 text-xl h-[50px]">
            <span>
              <BsFillChatRightDotsFill size={26} />
            </span>
            <span className="text-2xl font-semibold">Message</span>
          </div>
          <div className="w-full flex flex-col text-blue-600 py-4 h-[400px] overflow-y-auto pr-3 p-3 border border-blue-600 rounded-md">
            {myFriends?.map((item, index) => (
              <Link
                to={`/dashboard/chat/${item.friendId}`}
                key={index}
                className={`flex items-center gap-3 py-3 px-2 ${
                  item.friendId === sellerId && "bg-gray-400/20 rounded-md"
                }`}
              >
                <div className="w-[30px] h-[30px] rounded-full border relative">
                  {activeSeller.some((i) => i.sellerId === item.friendId) && (
                    <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img
                    src={
                      item.image ||
                      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    }
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-240px)] md-lg:w-full">
          {currentFriend ? (
            <div className="w-full h-full ml-3 md-lg:ml-0">
              <div className="flex items-center gap-3 text-blue-600 text-xl h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full border relative">
                  {activeSeller.some(
                    (i) => i.sellerId === currentFriend.friendId
                  ) && (
                    <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img
                    src={
                      currentFriend?.image ||
                      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    }
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <span className="font-semibold">{currentFriend?.name}</span>
              </div>
              <div className="h-[400px] w-full bg-gray-400/20 rounded-md p-3">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {friendMessages?.map((item, index) => {
                    if (currentFriend?.friendId !== item.receiverId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={index}
                          className="w-full flex gap-2 items-center py-1"
                        >
                          <img
                            src={
                              currentFriend?.image ||
                              "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                            }
                            alt=""
                            className="w-10 h-10"
                          />
                          <div className="p-2 bg-green-600/80 text-white rounded-md">
                            <span>{item.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={index}
                          className="w-full flex gap-2 justify-end items-center py-1"
                        >
                          <div className="p-2 bg-blue-600/80 text-white rounded-md">
                            <span>{item.message}</span>
                          </div>
                          <img
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                            alt=""
                            className="w-10 h-10"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full border-blue-600">
                  <label
                    htmlFor="file"
                    className="text-blue-600 cursor-pointer"
                  >
                    <FaPlus size={20} />
                  </label>
                  <input type="file" name="" id="file" hidden />
                </div>
                <div className="border border-blue-600 h-[50px] w-[calc(100%-50px)] rounded-md relative">
                  <input
                    type="text"
                    placeholder="Enter your message"
                    className="w-full rounded-md h-full outline-none py-3 pl-3 pr-[120px]"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                  <div className="absolute top-1/2 right-1 translate-y-[-50%] text-blue-600">
                    <div className="flex items-center gap-5">
                      <span className="cursor-pointer">
                        <MdOutlineEmojiEmotions size={26} />
                      </span>
                      <span
                        className="p-3 bg-main rounded-md cursor-pointer"
                        onClick={sendMessage}
                      >
                        <BsSendFill size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-lg font-semibold text-blue-600">
              Select seller to send message
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
