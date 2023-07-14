import React, { useEffect, useState } from "react";
import Transactiontable from "@/components/table/transactions/sendandreceive";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SendPopup from "./popupsendandreceive";
import { getAllTransactions } from "@/functions/handler/user/transactions";
import { useSelector } from "react-redux";
import { selectAllSendAndReceiveTransactions } from "@/features/auth/api/transactions";
import LoadingSpinner from "@/layouts/loadingSpinner";
import moment from "moment";
import Image from "next/image";
import { Avater } from "@/assets";
function SendAndReceive() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const getTransactions = useSelector(selectAllSendAndReceiveTransactions);
  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };

  useEffect(() => {
    getAllTransactions({ setLoading, type: "SEND&RECEIVE" });
  }, []);

  const columns = [
    {
      name: "From Pay ID",
      selector: (row: any) => (
        <>
          {row.type == "WITHDRAW" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.fromUserAssetId ? (
                <Image
                  src={row.fromUserAssetId?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={Avater}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {"External"}
              </p>
            </div>
          )}
          {row.type == "TRANSFER" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.fromUserAssetId ? (
                <Image
                  src={row.fromUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={row.toP2PAsset.User.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {row.fromUserAsset
                  ? row.fromUserAsset?.User?.uid
                  : row.fromP2PAsset.User.uid}
              </p>
            </div>
          )}
          {row.type !== "TRANSFER" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.fromUserAssetId ? (
                <Image
                  src={row.fromUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={Avater}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {row.fromUserAsset ? row.fromUserAsset?.User?.uid : "EXTERNAL"}
              </p>
            </div>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: any) => row.type,
    },
    {
      name: "To Pay ID",
      selector: (row: any) => (
        <>
          {row.type == "WITHDRAW" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.toUserAsset ? (
                <Image
                  src={row.toUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={Avater}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {"External"}
              </p>
            </div>
          )}
          {row.type == "TRANSFER" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.fromUserAssetId ? (
                <Image
                  src={row.fromUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={row.toP2PAsset.User.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {row.fromUserAsset
                  ? row.fromUserAsset?.User?.uid
                  : row.fromP2PAsset.User.uid}
              </p>
            </div>
          )}
          {row?.type !== "TRANSFER" && (
            <div className="flex items-center space-x-2 w-[300px]">
              {row.toUserAsset ? (
                <Image
                  src={row.toUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={row.fromUserAsset?.User?.profileImageUrl}
                  alt="profile img"
                  height={27}
                  width={27}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-[10px] uppercase">
                {!row?.toUserAsset ? "External" : row.toUserAsset?.User?.uid}
              </p>
            </div>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "From Wallet",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <p className="font-semibold text-[10px] uppercase">
            {row.fromWalletType}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "To Wallet",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <p className="font-semibold text-[10px] uppercase">
            {row.toWalletType}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <p className="font-semibold text-[10px] uppercase">
            {Number(row.amount)?.toFixed(6)}
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
      name: "Platform Fee",
      selector: (row: any) => Number(row.userFeesPaid)?.toFixed(6),
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

  console.log(getTransactions);
  return (
    <div className="">
      <HeaderWidget title="Transactions" />
      <div>
        <LoadingSpinner loading={loading} />
        <Transactiontable
          show2={show}
          setShow2={setShow}
          data={data}
          columns={columns}
          transactions={getTransactions}
        />
      </div>
    </div>
  );
}

export default SendAndReceive;
