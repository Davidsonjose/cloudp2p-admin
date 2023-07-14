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
function PtpTransaction() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const alloffers = useSelector(selectAllP2POffers);
  const [loading, setLoading] = useState(false);
  const handleDisable = (dat: any) => {
    setShow(!show);
    setData(dat);
  };

  const columns = [
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
      name: "Type",
      selector: (row: any) => row.type,
    },
    {
      name: "Pair",
      selector: (row: any) => (
        <>
          {row.p2pAsset.asset.symbol}/{row.fiatCurrencyCode}
        </>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => (
        <button
          className={`py-1 px-4 rounded ${
            row?.status?.toLowerCase() === "open" &&
            "bg-[#3AB83A1A] text-green-800"
          } ${
            row?.status?.toLowerCase() === "closed" &&
            "bg-[#F7931A1A] text-[#F7931A] text-[12px] font-semibold"
          } capitalize`}
        >
          {row.status}
        </button>
      ),
    },
    {
      name: "Available Volume",
      selector: (row: any) => (
        <>
          {row.availableVolume} {row.p2pAsset.asset.symbol}
        </>
      ),
    },
    {
      name: "Trades",
      selector: (row: any) => row._count.P2PTrades,
    },
    {
      name: "Ref ID",
      selector: (row: any) => row.refId,
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
    getAllP2POffer({ setLoading });
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
          trades={alloffers}
          type="P2P Offers"
        />
      </div>
    </div>
  );
}

export default PtpTransaction;
