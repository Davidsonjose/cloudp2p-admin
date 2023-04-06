import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import { getAdminToken } from "@/common";
import AnalyticWidget from "@/features/dashboard/analyticwidget";
import AnalyticGraph from "@/features/dashboard/analyticgraph";
import UserTable from "@/components/table/userdashboard";
const barData = [
  {
    name: "Jan",
    uv: 4000,

    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,

    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,

    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,

    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,

    amt: 2181,
  },
  {
    name: "Jun",
    uv: 3890,

    amt: 2181,
  },
];

function Dashboard() {
  const token = getAdminToken();

  const columns = [
    {
      name: "Name",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <div
            className={`bg-${row.color}-600 h-[40px] w-[40px]  rounded-full flex justify-center items-center`}
          >
            <h3 className="text-white text-center text-[16px] font-bold">
              {row.avater}
            </h3>
          </div>
          <p className="font-bold w-[200px]">{row.username}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Phone number",
      selector: (row: any) => row.phone,
    },
    {
      name: "Email Address",
      selector: (row: any) => row.email,
    },
    {
      name: "KYC Level",
      selector: (row: any) => row.kyc,
    },
    {
      name: "Date Registered",
      selector: (row: any) => row.date,
    },
    {
      name: "Action",
      selector: (row: any) => (
        <div className="flex items-center border border-gray-300 py-3 my-2 px-4 rounded-lg space-x-2 cursor-pointer">
          <button className="">Disable</button>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      ),
    },
  ];

  const userdetails = [
    {
      username: "Davidson",
      phone: "(234) 900 000 000",
      email: "davidsonjose313@gmail.com",
      kyc: "KYC 3",
      date: "09/04/2023",
      color: "green",
      avater: "AB",
    },
    {
      username: "Obiabo",
      phone: "(234) 900 000 000",
      email: "resmente313@gmail.com",
      kyc: "KYC 3",
      date: "09/10/2023",
      color: "red",
      avater: "DA",
    },
  ];

  return (
    <div className="h-screen bg-[#FAFAFA] w-full px-6 lg:px-0 py-4 lg:py-0">
      <HeaderWidget title="Dashboard" />

      <div className="flex items-center justify-between pt-10 lg:pt-0">
        <h3 className="text-[#000000] text-[16px] font-semibold">
          {"User's"} Overview
        </h3>
        <button className="p-3 hover:border-[#17193F] hover:border hover:bg-white hover:text-[#17193F] bg-[#17193F] rounded text-white">
          Download Report
        </button>
      </div>
      <AnalyticWidget />
      <AnalyticGraph />
      <UserTable columns={columns} userdetails={userdetails} />
    </div>
  );
}

export default Dashboard;
