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
  
  const data = [
    {
      name: "Mon",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Tue",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Wed",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Thu",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Fri",
      uv: 1890,
      pv: 4800,
      amt: 2181,
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
    </div>
  );
}

export default Dashboard;
