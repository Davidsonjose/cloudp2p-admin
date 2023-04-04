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
        <div className="flex items-center space-x-2">
          <p className="2xl bg-blue-600  rounded-full">
            <i className="fa-solid fa-user p-3 text-white"></i>
          </p>
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
      selector: (row: any) => row.kyc,
    },
    {
      name: "Action",
      selector: (row: any) => (
        <div>
          <></>
        </div>
      ),
    },
  ];

  const userdetails = [
    {
      username: "Davidson Jose",
      phone: "(234) 900 000 000",
      email: "davidsonjose313@gmail.com",
      kyc: "KYC 3",
      date: "09/04/2023",
    },
    {
      username: "Obiabo Emmanuel",
      phone: "(234) 900 000 000",
      email: "resmente313@gmail.com",
      kyc: "KYC 3",
      date: "09/10/2023",
    },
  ];

  return (
    <div className="h-screen bg-[#FAFAFA] w-full px-6 lg:px-0 py-4 lg:py-0">
      <div className="flex items-center justify-between">
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
