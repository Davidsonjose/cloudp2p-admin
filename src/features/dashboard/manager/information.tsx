import { Avater } from "assets";
import axios from "axios";
import { getAdminToken, getManagerToken } from "common";
import API_URL from "config";
import { selectUser } from "features/auth/api/slice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import IP_URL from "config/ipurl";
import { useRef } from "react";
import { format } from "timeago.js";
import LoadingSpinner from "layouts/loadingSpinner";
function InformationMgr() {
  const [loading, setLoading] = useState(false);
  const socket = useRef<any>(io(IP_URL));
  const currentuse = useSelector(selectUser);
  const token = getManagerToken();
  const navigate = useNavigate();
  const [newtext, setNewtext] = useState("");
  const [allconversation, setConversation] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
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

  useEffect(() => {
    setLoading(true);
    axiosCreate
      .get(`${API_URL}/manager/information/${currentuse?._id}`)
      .then(({ data }) => {
        setInfo(data?.payload[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const data = [
    { subject: "Welcome to a new month", role: "admin" },
    { subject: "Welcome to a new month", role: "admin" },
    { subject: "Welcome to a new month", role: "admin" },
    { subject: "Welcome to a new month", role: "admin" },
  ];

  return (
    <div className=" p-4  bg-white shadow-wrapper">
		<LoadingSpinner loading={loading} setLoading={setLoading} />
      {/* <div className='justify-end flex w-full '>
				<div className=' w-full lg:w-[200px]'>
					<span className=''>1</span> - <span className=''>50</span>
					<span className='ml-4 cursor-pointer'>{'<'}</span>
					<span className='ml-4 cursor-pointer'>{'>'}</span>
				</div>
			</div> */}

      <div className="py-8">
        {info?.map((item: any, i: any) => (
          <div
            onClick={() => {
              navigate("chat", { state: item });
            }}
            key={i}
            className="flex flex-wrap justify-between items-center cursor-pointer border-b border-gray-200 py-3"
          >
            {/* {item?.receiver?._id === currentuse?._id && item?.recieverseen === false && ( */}
            {!item?.seen ? (
              <div className=" w-5 h-5 bg-blue-600 rounded-full flex justify-center items-center text-[10px] text-white"></div>
            ) : (
              <div className=" w-5 h-5 rounded-full flex justify-center items-center text-[10px] text-white"></div>
            )}
            {/* )} */}
            <div className="lg:w-[25%] flex justify-start items-center">
              <p className="font-bold text-sm">{item?.subject}</p>
            </div>
            <div className="lg:w-[65%] flex justify-start items-center">
              <p className="font-normal text-sm">{item?.message}</p>
            </div>
            {/* {item?.receiver?._id === currentuse?._id && item?.recieverseen === false && ( */}
            <span className=" text-gray-400 rounded-full flex justify-center items-center text-[10px]">
              {format(item?.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationMgr;
