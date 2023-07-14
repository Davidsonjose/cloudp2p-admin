import React, { useEffect, useState } from "react";
import ManageAdmin from "@/components/table/manageadmin";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import { useSelector } from "react-redux";
import { selectAllAdminUsers } from "@/features/auth/api/users";
// import SendPopup from "./popupsendandreceive";
import moment from "moment";
import { getAdminUsers } from "@/functions/handler/user/admin";
import Image from "next/image";
import { Avater } from "@/assets";
function ManagerUser() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const alladmins = useSelector(selectAllAdminUsers);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };

  const columns = [
    {
      name: "Name",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <Image
            src={Avater}
            alt="profile img"
            height={40}
            width={40}
            className="rounded-full"
          />
          <p className="text-xs">
            {row.firstName} {row.lastName}
          </p>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <p className="font-bold w-[200px]">{row.email}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => (
        <button
          className={`py-1 px-4 rounded bg-[#3AB83A1A] text-green-800"
          }`}
        >
          {row.role}
        </button>
      ),
    },
    {
      name: "Last Seen",
      selector: (row: any) => (
        <>
          {!row.loggedInAt
            ? "Never logged in"
            : moment(row.loggedInAt).format("LL")}{" "}
        </>
      ),
    },
    {
      name: "Date Added",
      selector: (row: any) => moment(row.createdAt).format("LL"),
    },
    {
      name: "Action",
      selector: (row: any) => (
        <div className="relative">
          <div
            className="flex items-center border border-gray-300 py-3 my-2 px-4 rounded-lg space-x-2 cursor-pointer"
            onClick={() => handleDisable(row)}
          >
            <button className="">Disable</button>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAdminUsers({ setLoading, setMessage });
  }, []);

  console.log(alladmins);
  return (
    <div className="">
      <HeaderWidget title="Manage Admin" />
      <div>
        <ManageAdmin
          show2={show}
          setShow2={setShow}
          data={data}
          columns={columns}
          userdetails={alladmins}
        />
      </div>
    </div>
  );
}

export default ManagerUser;
