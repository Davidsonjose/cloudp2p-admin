import React from "react";
import UserTable from "@/components/table/mainuser";
function MainUser() {
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
    <>
      <UserTable columns={columns} userdetails={userdetails} />
    </>
  );
}

export default MainUser;
