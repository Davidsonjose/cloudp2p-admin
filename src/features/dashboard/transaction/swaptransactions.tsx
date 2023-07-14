import React, { useEffect, useState } from "react";
import SwapTransaction from "@/components/table/transactions/swaptransaction";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SendPopup from "./popupsendandreceive";
import {
  getAllSwapTrasactions,
  getAllTransactions,
} from "@/functions/handler/user/transactions";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { useSelector } from "react-redux";
import { selectAllSwapTransactions } from "@/features/auth/api/transactions";
import moment from "moment";
import Image from "next/image";
function SwapTransactions() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };
  const alltransactions = useSelector(selectAllSwapTransactions);

  const columns = [
    {
      name: "User Pay ID",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <Image
            src={row.user.profileImageUrl}
            alt="profile img"
            height={27}
            width={27}
            className="rounded-full"
          />
          <p className="font-semibold text-[10px] uppercase">{row.user.uid}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Pair",
      selector: (row: any) => (
        <p>
          {row.baseAsset.asset.symbol}/{row.quoteAsset.asset.symbol}
        </p>
      ),
    },

    {
      name: "Amount",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <p className="font-semibold text-[10px] uppercase">
            {row.baseAmount} {row.baseAsset.asset.symbol} / {row.quoteAmount}{" "}
            {row.quoteAsset.asset.symbol}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => (
        <button
          className={`py-1 px-4 rounded ${
            row.status?.toLowerCase() === "completed" &&
            "bg-[#3AB83A1A] text-green-800"
          } ${
            row.status?.toLowerCase() === "pending" &&
            "bg-[#F7931A1A] text-[#F7931A] text-[12px] font-semibold"
          } ${
            row.status?.toLowerCase() === "failed" &&
            "bg-[#F7931A1A] text-red-600 text-[12px] font-semibold"
          } capitalize`}
        >
          {row.status}
        </button>
      ),
    },
    {
      name: "Ref ID",
      selector: (row: any) => row.refId,
    },
    {
      name: "Gas Fee",
      selector: (row: any) => Number(row.providerFeeRemitted)?.toFixed(6),
    },
    {
      name: "Date",
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
            <button className="">View</button>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllSwapTrasactions({ setLoading });
  }, []);

  console.log(alltransactions);
  return (
    <div className="">
      <HeaderWidget title="Swap Transactions" />
      <LoadingSpinner loading={loading} />
      <div>
        <SwapTransaction
          show2={show}
          setShow2={setShow}
          data={data}
          columns={columns}
          transactions={alltransactions}
        />
      </div>
    </div>
  );
}

export default SwapTransactions;
