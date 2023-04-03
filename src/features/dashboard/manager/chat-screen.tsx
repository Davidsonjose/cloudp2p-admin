import axios from "axios";
import { getAdmin, getAdminToken } from "common";
import API_URL from "config";
import { selectUser } from "features/auth/api/slice";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import IP_URL from "config/ipurl";
function ChatScreenManager() {
  const navigate = useNavigate();
  const socket = useRef<any>(io(IP_URL));
  //   const [socket, setSocket] = useState<any>(null);
  const location = useLocation();
  const scrollRef = useRef<any>();
  const token = getAdminToken();
//   const currentUser = getAdmin();
  const currentUser = useSelector(selectUser);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>(null);
  const [incomingMessage, setIncomingMessage] = useState<any>(null);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });

  //   useEffect(() => {
  //     setSocket(
  //       io(IP_URL, {
  //         transports: ["websocket", "polling", "flashsocket"],
  //       })
  //     );
  //   }, []);

  useEffect(() => {
    socket.current = io(IP_URL);
    socket.current.on("getMessage", (data: any) => {
      setIncomingMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    incomingMessage && setMessages((prev: any) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser?._id);
    socket.current.on("getUsers", (users: any) => {});
  }, [currentUser]);

  //   useEffect(() => {
  //     // socket?.on();
  //   }, [socket]);
  useEffect(() => {
    axiosCreate
      .post(`${API_URL}/admin/messages`, {
        from: currentUser?._id,
        to: location?.state?._id,
      })
      .then(({ data }) => {
        // console.log
        setMessages(data?.payload[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location?.state?._id]);

  const handleSend = () => {
    setText("");
    if (text === "") {
      return;
    }

    socket.current.emit("sendMessage", {
      senderId: currentUser?._id,
      receiverId: location?.state?._id,
      text: text,
    });
    setMessages([
      ...messages,
      {
        sender: currentUser?._id,
        receiverId: location?.state?._id,
        text: text,
      },
    ]);
    // console.log()
    axiosCreate
      .post(`${API_URL}/admin/send-message`, {
        from: currentUser?._id,
        to: location?.state?._id,
        text: text,
        sender: currentUser?._id,
      })
      .then(({ data }) => {
        // setMessages(messages)
        // console.log("Sent message");
        // window.location.reload();
        // console.log(data?.payload[0])
        // setMessages([...messages, data?.payload[0]]);
      })
      .catch(() => {});
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <div className="flex-1 p:2 sm:p-4 overflow-y-scroll	 justify-between flex flex-col h-[90vh] lg:h-[85vh] bg-white shadow-wrapper">
        {/* chat header */}

        <div className="flex mt-5 sm:items-center justify-between  border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 top-0">
                <svg width={20} height={20}>
                  <circle cx={8} cy={8} r={8} fill="currentColor" />
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                className="w-10 h-10 rounded-full"
                alt=""
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">
                  {location?.state?.firstname}({location?.state?.role})
                </span>
              </div>
              <span className="text-xs text-gray-400 mb-4">Active</span>
            </div>
          </div>
        </div>

        {/* receiver */}

        {messages?.length === 0 ? (
          <div className="text-center ">
            <p className="text-[50px]">No conversations</p>
            <p className="text-gray-200">
              start conversation by sending a message
            </p>
          </div>
        ) : (
          <div
            id="messages"
            className="flex h-[70%] flex-col space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {/* sender */}
            {messages?.map((dats: any) => (
              <div ref={scrollRef}>
                <div
                  className={`chat-message flex ${
                    dats?.sender == currentUser?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span
                          className={`${
                            dats?.sender == currentUser?._id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 "
                          } px-4 py-2 rounded-lg inline-block rounded-bl-none text-gray-600`}
                        >
                          {dats?.text}
                        </span>
                      </div>
                    </div>
                    {dats?.sender !== currentUser?._id && (
                      <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 sticky">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="text"
              placeholder="Write your message!"
              value={text}
              onChange={(e: any) => setText(e.target.value)}
              className="w-[70%] lg:w-[70%] focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 sm:flex">
              <button
                type="button"
                className="sm:inline-flex hidden items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="sm:inline-flex hidden items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="sm:inline-flex hidden items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={() => handleSend()}
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatScreenManager;

// {messages?.map((dats: any) => (
// 	<div
// 	  id="messages"
// 	  className="flex flex-col space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
// 	>
// 	  {!dats?.sender === currentUser?._id ? (
// 		<div className="chat-message">
// 		  <div className="flex items-end">
// 			<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
// 			  <div>
// 				<span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
// 				  {dats?.text}
// 				</span>
// 			  </div>
// 			</div>
// 			<img
// 			  src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
// 			  alt="My profile"
// 			  className="w-6 h-6 rounded-full order-1"
// 			/>
// 		  </div>
// 		</div>
// 	  ) : (
// 		<div className="chat-message">
// 		  <div className="flex items-end justify-end">
// 			<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
// 			  <div>
// 				<span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
// 				  {dats?.text}
// 				</span>
// 				<p className="flex items-end justify-end">
// 				  {format(dats?.createdAt)}
// 				</p>
// 			  </div>
// 			</div>
// 		  </div>
// 		</div>
// 	  )}

// 	  {/* sender */}
// 	</div>
//   ))}
