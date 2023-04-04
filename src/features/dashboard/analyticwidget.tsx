import React from "react";
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
function AnalyticWidget() {
  const widgetdata = [
    {
      name: "total payments",
      total: 90933443223,
      image: Payment,
      icon: PaymentIcon,
      increase: true,
      percent: 40,
    },
    {
      name: "Total active users",
      total: 909334,
      increase: false,
      percent: 60,
      icon: ACTIVEICON,
      image: ACTIVEUSER,
    },
    {
      name: "Total registered users",
      total: 5000499302,
      increase: true,
      percent: 10,
      icon: REGISTEREDICON,
      image: REGISTERED
    },
    {
      name: "Users loggedin today",
      total: 890339283,
      increase: false,
      percent: 20,
      icon: LOGGEDICON,
      image: LOGGED,
    },
  ];
  return (
    <div className="mt-6 bg-white rounded-lg">
      <div className="p-4">
        <div className="flex items-center space-x-4 z-10">
          {widgetdata?.map((data, index) => (
            <div
              key={index}
              className="border  relative w-full h-[130px] z-10  border-gray-200 rounded-lg"
            >
              <div className="px-3 mt-5">
                <h3 className="font-semibold text-[#141414B2] text-[10px] uppercase">
                  {data.name}
                </h3>
                <p className="text-[20px] text-[#141414] font-semibold">
                  <Currency quantity={data.total} currency="NGN" />
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
                className="absolute left-[83%] z-10 top-[66%]"
              />
              <Image
                src={data.image}
                alt=""
                className="absolute w-16 h-16 left-[72%] top-[49%]"
              />

              {/* <div className="absolute w-[150px] h-[150px]  bg-[#FF3D00] rounded-[12px]"></div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticWidget;
