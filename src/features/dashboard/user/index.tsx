import React, { useEffect, useState } from "react";
import UserTable from "@/components/table/mainuser";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import { useSelector } from "react-redux";
import { selectAllUsers } from "@/features/auth/api/users";
import Image from "next/image";
import moment from "moment";
import { getAllUsers } from "@/functions/handler/user";
import LoadingSpinner from "@/layouts/loadingSpinner";
import UserDetailsPop from "@/components/modals/userDetails";
import BroadcastEmail from "@/components/modals/broadcastEmail";
function MainUser() {
  const allusers = useSelector(selectAllUsers);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [broadcastShow, setBroadcastShow] = useState(false);
  const [datas, setDatas] = useState<any>(null);
  const [detailShow, setDetailShow] = useState(false);
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
      selector: (row: any) => (row.phoneNumber ? row.phoneNumber : "Not Added"),
    },
    {
      name: "Email Address",
      selector: (row: any) => (row.email ? row?.email : "Not Added"),
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
        <div
          onClick={() => {
            setDatas(row);
            setDetailShow(true);
          }}
          className="flex items-center border border-gray-300 py-3 my-2 px-4 rounded-lg space-x-2 cursor-pointer"
        >
          <button className="">View</button>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllUsers({ setLoading, setMessage });
  });
  console.log(loading, "here is loading");
  return (
    <div className="">
      {/* <LoadingSpinner loading={loading} /> */}
      <HeaderWidget title="Admin All Users" />

      <button
        onClick={() => setBroadcastShow(true)}
        className="bg-blue-400 text-white p-4 rounded-lg"
      >
        Broadcast email
      </button>
      <UserTable columns={columns} userdetails={allusers} />

      <UserDetailsPop show={detailShow} setShow={setDetailShow} datas={datas} />

      <BroadcastEmail setShow={setBroadcastShow} show={broadcastShow} />
    </div>
  );
}

export default MainUser;
