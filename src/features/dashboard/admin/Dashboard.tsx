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
import { getActiveAgg, getAllUsers } from "@/functions/handler/user";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { useSelector } from "react-redux";
import { selectAllUsers } from "@/features/auth/api/users";
import Image from "next/image";
import moment from "moment";
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const allusers = useSelector(selectAllUsers);

  const columns = [
    {
      name: "Name",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <Image
            src={row.profileImageUrl}
            alt="profile img"
            height={40}
            width={40}
            className="rounded-full"
          />
          <p className="font-bold w-[200px]">{row.firstName}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Phone number",
      selector: (row: any) => row.phoneNumber,
    },
    {
      name: "Email Address",
      selector: (row: any) => row.email,
    },
    {
      name: "KYC Level",
      selector: (row: any) => row.kycLevel,
    },
    {
      name: "Date Registered",
      selector: (row: any) => moment(row.createdAt).format("LL"),
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

  useEffect(() => {
    (async () => {
      getAllUsers({ setLoading, setMessage });
      const useragg = await getActiveAgg();
      console.log(useragg);
    })();
  }, []);

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
      <LoadingSpinner loading={loading} />
      <AnalyticWidget />
      <AnalyticGraph />
      {/* <UserTable columns={columns} userdetails={allusers} /> */}
    </div>
  );
}

export default Dashboard;
