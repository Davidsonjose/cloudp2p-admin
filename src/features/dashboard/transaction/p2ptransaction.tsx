import React, { useState } from "react";
import P2ptransaction from "@/components/table/transactions/p2ptransaction";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SendPopup from "./popupsendandreceive";
function PtpTransaction() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };

  const columns = [
    {
      name: "User ID",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <div
            className={`bg-${row.color}-600 h-[26px] w-[26px]  rounded-full flex justify-center items-center`}
          >
            <h3 className="text-white text-center text-[10px] font-bold">
              {row.avater}
            </h3>
          </div>
          <p className="font-semibold text-[10px] uppercase">{row.userid}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Pair",
      selector: (row: any) => row.pair,
    },
    {
      name: "Status",
      selector: (row: any) => (
        <button
          className={`py-1 px-4 rounded ${
            row.status === "success" && "bg-[#3AB83A1A] text-green-800"
          } ${
            row.status === "pending" &&
            "bg-[#F7931A1A] text-[#F7931A] text-[12px] font-semibold"
          } capitalize`}
        >
          {row.status}
        </button>
      ),
    },
    {
      name: "Transaction ID",
      selector: (row: any) => row.transactionid,
    },
    {
      name: "Fee",
      selector: (row: any) => row.fee,
    },
    {
      name: "Merchant",
      selector: (row: any) => row.merchant,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
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

  const transactions = [
    {
      username: "Davidson",
      phone: "(234) 900 000 000",
      date: "09/04/2023",
      color: "green",
      avater: "AB",
      userid: "gtyueiwoos",
      status: "success",
      fee: "0.034",
      pair: "USDT / ETH",
      transactionid: "TYpopoee",
      merchant: "dominic.eth",
    },
    {
      username: "Obiabo",
      phone: "(234) 900 000 000",
      email: "resmente313@gmail.com",
      kyc: "KYC 3",
      date: "09/10/2023",
      color: "red",
      avater: "DA",
      userid: "dtryuiiopw",
      type: "Send",
      status: "pending",
      address: "ipayex.eth",
      fee: "0.034",
      senderid: "hsjjkajsss",
      pair: "USDT / BNB",
      transactionid: "TYpopoee",
      merchant: "dominic.eth",
    },
  ];

  return (
    <div className="">
      <HeaderWidget title="P2P Transactions" />
      <div>
        <P2ptransaction
          show2={show}
          setShow2={setShow}
          data={data}
          columns={columns}
          userdetails={transactions}
        />
      </div>
    </div>
  );
}

export default PtpTransaction;
