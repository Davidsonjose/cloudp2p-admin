import React, { useEffect, useState } from "react";
import P2ptransaction from "@/components/table/transactions/p2ptransaction";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SendPopup from "./popupsendandreceive";
import { useSelector } from "react-redux";
import {
  selectAllP2POffers,
  selectAllP2PTrades,
} from "@/features/auth/api/p2p";
import { getAllP2POffer, getAllP2PTrade } from "@/functions/handler/user/p2p";
import LoadingSpinner from "@/layouts/loadingSpinner";
import moment from "moment";
import Image from "next/image";
import { Avater } from "@/assets";
import DisputeMessage from "@/components/modals/dispute-messages";
function P2PTrades() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const alltrades = useSelector(selectAllP2PTrades);
  const [disputeshow, setDisputeShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };

  const columns = [
    {
      name: "Customer Pay ID",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <Image
            src={row.customer.profileImageUrl}
            alt="profile img"
            height={27}
            width={27}
            className="rounded-full"
          />
          <p className="font-semibold text-[10px] uppercase">
            {row.customer.uid}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: any) => row.offer.type,
    },
    {
      name: "Pair",
      selector: (row: any) => (
        <>
          {row?.offer?.p2pAsset?.asset?.symbol}/{row?.offer.fiatCurrencyCode}
        </>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => (
        <button
          className={`py-1 px-4 rounded ${
            row?.status?.toLowerCase() === "completed" &&
            "bg-[#3AB83A1A] text-green-800"
          } ${
            row?.status?.toLowerCase() === "cancelled" &&
            "bg-[#F7931A1A] text-[#F7931A] text-[12px] font-semibold"
          } capitalize`}
        >
          {row.status}
        </button>
      ),
    },
    {
      name: "Volume",
      selector: (row: any) => (
        <>
          {row.volume}
          {row?.offer?.p2pAsset?.asset?.symbol}/{row?.offer?.fiatCurrencyCode}
          {row?.convertedAmount}
        </>
      ),
    },
    {
      name: "Ref ID",
      selector: (row: any) => row.refId,
    },
    {
      name: "Merchant",
      selector: (row: any) => (
        <div className="flex items-center space-x-2 w-[300px]">
          <Image
            src={Avater}
            alt="profile img"
            height={27}
            width={27}
            className="rounded-full"
          />
          <p className="font-semibold text-[10px] uppercase">
            {row.merchant.tag}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Dispute",
      selector: (row: any) => (
        <>
          {row?.P2PTradeDispute ? (
            <div
              className="flex items-center border border-gray-300 py-3 my-2 px-4 rounded-lg space-x-2 cursor-pointer"
              // onClick={() => handleDisable(row)}
              onClick={() => {
                setData(row);
                setDisputeShow(true);
              }}
            >
              <button className="">View Dispute</button>
              <i className="fa-solid fa-caret-down"></i>
            </div>
          ) : (
            <p>No dispute</p>
          )}
        </>
      ),
      sortable: true,
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
    getAllP2PTrade({ setLoading });
  }, []);

  return (
    <div className="">
      <LoadingSpinner loading={loading} />
      <HeaderWidget title="P2P Offers" />
      <div>
        <P2ptransaction
          show2={show}
          setShow2={setShow}
          data={data}
          columns={columns}
          trades={alltrades}
          type="P2P Trades"
        />
      </div>
      <DisputeMessage data={data} open={disputeshow} setOpen={setDisputeShow} />
    </div>
  );
}

export default P2PTrades;
