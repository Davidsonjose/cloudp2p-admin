import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Payment,
  PaymentIcon,
  ACTIVEICON,
  ACTIVEUSER,
  LOGGED,
  LOGGEDICON,
  REGISTERED,
  REGISTEREDICON,
} from "@/assets";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../auth/api/users";
import { getActiveAgg } from "@/functions/handler/user";
import { getAllTransactionAgg } from "@/functions/handler/user/transactions";
function AnalyticWidget() {
  const allusers = useSelector(selectAllUsers);
  const [usersToday, setUsersToday] = useState(0);
  const [activeusers, setActiveUsers] = useState(0);
  const [transactionAgg, setTransactionAgg] = useState(0);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const usersToday = allusers.filter(
      (user: any) => user.createdAt.split("T")[0] === today
    );

    setUsersToday(usersToday?.length);
  }, [allusers]);

  useEffect(() => {
    (async () => {
      const useragg = await getActiveAgg();
      const transactionagg = await getAllTransactionAgg();
      // console.log(useragg);
      // setActiveUsers(useragg[0]?._count?.id);
      // setTransactionAgg(transactionagg[0]?._count?.id);
      console.log(transactionagg, "here is it man");
    })();
  }, []);

  console.log(usersToday);
  const widgetdata = [
    {
      name: "total payments",
      total: 300000,
      image: Payment,
      icon: PaymentIcon,
      increase: true,
      percent: 40,
    },
    {
      name: "Active users",
      total: activeusers,
      increase: true,
      percent: 60,
      icon: ACTIVEICON,
      image: ACTIVEUSER,
      normal: true,
    },
    {
      name: "Total registered users",
      total: allusers?.length,
      increase: true,
      percent: 10,
      icon: REGISTEREDICON,
      image: REGISTERED,
      normal: true,
    },
    {
      name: "Users registered today",
      total: usersToday,
      increase: true,
      percent: 20,
      icon: LOGGEDICON,
      image: LOGGED,
      normal: true,
    },
  ];
  return (
    <div className="mt-6 bg-white rounded-lg">
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-4 lg:mb-0 items-center space-x-0 lg:space-x-4 md:space-x-4  z-10">
          {widgetdata?.map((data, index) => (
            <div
              key={index}
              className="border relative mb-4 lg:mb-0 w-full h-[130px] z-10  border-gray-200 rounded-lg"
            >
              <div className="px-3 mt-5">
                <h3 className="font-semibold text-[#141414B2] text-[10px] uppercase">
                  {data.name}
                </h3>
                <p className="text-[20px] text-[#141414] font-semibold">
                  {!data?.normal ? (
                    <Currency quantity={data.total} currency="NGN" />
                  ) : (
                    <p>{data.total}</p>
                  )}
                </p>
                <p
                  className={` font-semibold ${
                    data.increase == true
                      ? "text-[#27AE60B2] "
                      : "text-[#FF0000B2] "
                  } text-[12px]`}
                >
                  {data.increase ? "+ increased" : "- decreased"} {data.percent}
                  % today
                </p>
              </div>

              <Image
                src={data.icon}
                alt=""
                className="absolute left-[95%] md:left-[83%] z-10 top-[66%] [@media(min-width:1500px)]:left-[90%] [@media(min-width:1500px)]:top-[70%]"
              />
              <div className="left-[90%] curve-image lg:left-[73%] md:left-[73%] top-[49%] absolute [@media(min-width:1500px)]:left-[85%]">
                <Image src={data.image} alt="" className="w-16 h-16" />
              </div>

              {/* <div className="absolute w-[150px] h-[150px]  bg-[#FF3D00] rounded-[12px]"></div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticWidget;
