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
import { CHART_BG, ICON_1, ICON_2, ICON_3, ICON_4, TEAM } from "@/assets";
import AnalyticWidget from "@/components/widgets/AnalyticWidget";
// import UserTable from "layouts/dashboardusertable";
import { useEffect, useState } from "react";
import { getAdminToken } from "@/common";
import axios from "axios";
import API_URL from "@/config";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { Fade } from "react-reveal";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
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
  const [showmodal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [staffs, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [information, setInformation] = useState<any>(0);
  const [emergency, setEmergency] = useState<any>(0);
  const [communication, setCommunication] = useState<any>(0);
  const [active, setActive] = useState<any>(0);
  const [expired, setExpired] = useState<any>(0);
  const [monthly, setMonthly] = useState<any>(0);
  const [yearly, setYearly] = useState<any>(0);
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
  const analyticData = [
    {
      label: "Active codes",
      value: active,
      icon: ICON_1,
      color: "bg-green-600",
    },
    {
      label: "Visits (last 30 days)",
      value: monthly,
      icon: ICON_2,
      color: "bg-orange-600",
    },
    {
      label: "All visits (last 365 days)",
      value: yearly,
      icon: ICON_3,
      color: "bg-blue-700",
    },
    {
      label: "Expired visits (last 30 days)",
      value: expired,
      icon: ICON_4,
      color: "bg-red-700",
    },
  ];




  return (
    <div className="h-screen bg-[#FAFAFA] w-full px-6 lg:px-0 py-4 lg:py-0">
    
    </div>
  );
}

export default Dashboard;
