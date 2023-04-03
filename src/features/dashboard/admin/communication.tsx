import { Avater } from "assets";
import axios from "axios";
import { getAdminToken } from "common";
import API_URL from "config";
import { selectUser } from "features/auth/api/slice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import IP_URL from "config/ipurl";
import { useRef } from "react";
function Communication() {
  const socket = useRef<any>(io(IP_URL));
  const currentuse = useSelector(selectUser);
  const token = getAdminToken();
  const [messages, setMessages] = useState<any>(null);
  const [incomingMessage, setIncomingMessage] = useState<any>(null);
  const navigate = useNavigate();
  const [newtext, setNewtext] = useState("");
  const [active, setActive] = useState();
  const [allconversation, setConversation] = useState<any>(null);
  const [recentconvo, setRecentConvo] = useState<any>(null);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });


  
  // useEffect(() => {
  //   socket.current = io(IP_URL);
  //   socket.current.on("getnewmessage", (data: any) => {
  //     setIncomingMessage({
  //       sender: data.sender,
  //       receiver: data?.receiver,
  //       receiverseen: data?.receiver,
  //       // createdAt: Date.now(),
  //       receivernew: data.receivernew + 1,
  //     });
  //   });
  // }, []);

  useEffect(() => {
    // newmessage
    axiosCreate
      .get(`${API_URL}/admin/all`)
      .then(({ data }) => {
        const convo = data?.payload[0];

        const filterconvo = convo?.filter(
          (dats: any) => dats?._id !== currentuse?._id
        );
        setConversation(filterconvo);
        // console.log(data?.payload[0], "here is active manager");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // useEffect(() => {
  //   incomingMessage &&
  //     setConversation((prev: any) => {
  //       const two = [...prev, incomingMessage];

  //       const filtered = two?.filter(
  //         (v: any, i: any, a: any) =>
  //           a.findIndex((v2: any) => v2?.sender === v?.sender) === i
  //       );
  //       return filtered;
  //     });
  // }, [incomingMessage]);

  // useEffect(() => {
  //   axiosCreate
  //     .post(`${API_URL}/admin/messages`, {
  //       from: currentuse?._id,
  //       to: location?.state?._id,
  //     })
  //     .then(({ data }) => {
  //       // console.log
  //       console.log(data?.payload[0]);
  //       setMessages(data?.payload[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [location?.state?._id]);

  useEffect(() => {
    axiosCreate
      .get(`${API_URL}/admin/messages/${currentuse?._id}`)
      .then(({ data }) => {
        const convo = data?.payload[0];
        const filtered = convo?.filter(
          (v: any, i: any, a: any) =>
            a.findIndex(
              (v2: any) =>
                v2?.sender?._id === currentuse?._id &&
                v2?.receiver?._id === v?.receiver?._id
            ) === i
        );

        console.log(filtered);
        setRecentConvo(filtered);
        // console.log(data?.payload[0], "here is active manager");
      })
      .catch((err) => {
        console.log(err);
      });

    axiosCreate
      .get(`${API_URL}/admin/messages/${currentuse?._id}`)
      .then(({ data }) => {
        const convo = data?.payload[0];
        setNewtext(convo[0]?.text);
        // const filtered = convo?.filter(
        //   (v: any, i: any, a: any) =>
        //     a.findIndex(
        //       (v2: any) =>
        //         v2?.sender?._id === currentuse?._id &&
        //         v2?.receiver?._id === v?.receiver?._id
        //     ) === i
        // );

        // console.log(filtered);
        // setRecentConvo(filtered);
        // console.log(data?.payload[0], "here is active manager");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className=" p-4  bg-white shadow-wrapper">
      <div className="w-[80%] relative mx-auto">
        <input
          className="w-full pl-8 pr-4 py-2 rounded-2xl border border-gray-300 bg-[#DADADA] placeholder:text-gray-400 outline-none"
          placeholder="Search"
        />
        <i className="fa-solid fa-magnifying-glass absolute top-3 left-2 text-gray-400"></i>
      </div>

      <div className="flex scrollbar-hide overflow-x-scroll  space-x-7 lg:justify-around items-center mt-4">
        {allconversation?.map((item: any, i: any) => (
          <div className="relative">
            <span className="absolute text-green-500 left-0 top-0">
              <svg width={20} height={20}>
                <circle cx={8} cy={8} r={8} fill="currentColor" />
              </svg>
            </span>

            <div
              className="flex items-center justify-center"
              onClick={() => navigate("chat", { state: item })}
            >
              <img src={Avater} className="w-10 h-10 rounded-full" alt="" />
            </div>
            <p className="text-gray-700  font-bold text-xs">
              {item?.firstname}
            </p>
            <p className="text-[10px] text-center capitalize">{item?.role}</p>
          </div>
        ))}
      </div>

      <div className="py-8">
        {recentconvo?.map((item: any, i: any) => (
          <div
            onClick={() => {
              navigate("chat", { state: item?.receiver });
            }}
            key={i}
            className="flex flex-wrap justify-between items-center border-b border-gray-200 py-3"
          >
            <div className="lg:w-[25%] flex justify-start items-center">
              <img src={Avater} alt="" className="rounded-full w-12 h-12" />
              <div className="ml-2">
                <p className="font-bold text-sm capitalize">
                  {item?.receiver?._id === currentuse?._id
                    ? item?.sender?.firstname
                    : item?.receiver?.firstname}
                  (
                  {item?.receiver?._id === currentuse?._id
                    ? item?.sender?.role
                    : item?.receiver?.role}
                  )
                </p>
                <p className="   text-xs text-gray-400">{newtext}</p>
              </div>
            </div>
            {item?.receiver?._id === currentuse?._id &&
              item?.recieverseen === false && (
                <div className=" w-5 h-5 bg-blue-600 rounded-full flex justify-center items-center text-[10px] text-white">
                  {/* {item.notification} */}
                  {item?.receiver?._id === currentuse?._id && item?.receivernew}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Communication;
