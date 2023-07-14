import ConfirmAction from "@/components/modals/deactivateOfferPrompt";
import ToastMessage from "@/components/toast/ToastMessage";
import {
  activateMerchantOffer,
  deactivateMerchantOffer,
} from "@/functions/handler/user/p2p";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { Dialog, DialogContent, TextField, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { format } from "timeago.js";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});
function PopTrade({ show, setShow, datas }: any) {
  const [reason, setReason] = useState("");
  const [confirmShow, setConfirmShow] = useState(false);
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(false);
  const [errorshow, setErrorShow] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  // const [confirmed, setConfirmed]

  const handleDeactivate = async () => {
    setError("");
    setErrorShow(false);
    deactivateMerchantOffer({
      setLoading,
      setError,
      offerId: datas?.id,
      setMessage,
      reason,
    });
  };

  useEffect(() => {
    if (error) {
      setErrorShow(true);
    }
    if (message) {
      setErrorShow(true);
      setConfirmShow(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [error, message]);

  // const ConfirmComponent = () => {
  //   return (
  //     <div>
  //       {!datas?.active ? (
  //         <>
  //           <p>
  //             You are about to deactivate a offer. please enter the reason
  //             below.
  //             <TextField
  //               id="standard-basic"
  //               label="Reason"
  //               variant="standard"
  //               className="w-[100%]"
  //               onChange={(e) => setReason(e.target.value)}
  //               value={reason}
  //             />
  //           </p>
  //         </>
  //       ) : (
  //         <p>
  //           You are about to reactivate a offer. To continue, confirm using the
  //           button below.
  //         </p>
  //       )}
  //     </div>
  //   );
  // };

  const handleConfirm = () => {
    setError("");
    setErrorShow(false);

    if (!datas?.active) {
      if (!reason) {
        setErrorShow(true);
        setError("Please enter the reason");
        return;
      }
      handleDeactivate();
    } else {
      // handleA
      activateMerchantOffer({
        setLoading,
        setError,
        offerId: datas?.id,
        setMessage,
      });
    }
  };

  console.log(datas);

  return (
    <>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setActive("details");
          setShow(false);
        }}
        aria-describedby="alert-dialog-slide-description"
        className="z-[200]"
        PaperProps={{
          style: {
            backgroundColor: "#F6F6F6",
          },
        }}
        // style={{borderR}}
      >
        {/* <DialogTitle className="text-center text-[#0A0E27]">
          {"Add User"}
        </DialogTitle> */}
        <LoadingSpinner loading={loading} />
        <ToastMessage show={errorshow} success={message} error={error} />
        <DialogContent className="lg:w-[600px] w-[340px] overflow-x-hidden">
          <div className="  bg-white ">
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <button
                  className={`rounded ${
                    active == "details"
                      ? "bg-[#17193F] text-white "
                      : "border-[#1414141A] bg-white border "
                  }  px-4 py-2`}
                  onClick={() => {
                    setActive("details");
                    setShow(true);
                  }}
                >
                  Details
                </button>
                {/* <button
                  onClick={() => setActive("flag")}
                  className={`rounded ${
                    active == "details"
                      ? "border-[#1414141A] bg-white border "
                      : "bg-[#17193F] text-white "
                  }  px-4 py-2`}
                >
                  {!datas?.active ? "Deactivate Offer" : "Activate Offer"}
                </button> */}
              </div>

              {active === "details" && (
                <Fade>
                  <div className="flex-1">
                    <div className="flex justify-between space-x-16 mt-5">
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Merchat Tag{" "}
                            <sup className="text-[#5cb85c] font-bold">
                              (
                              {datas?.merchant?.approved
                                ? "Verified"
                                : "Not Approved"}
                              )
                            </sup>
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.merchant?.tag}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Merchant Total Trades
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.merchant.totalTrades} trades{" "}
                            <span className="text-xs">
                              {datas?.merchant.percentSuccess}%successful
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Customer Name
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.customer?.firstName}{" "}
                            {datas?.customer?.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Customer Tag
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.customer?.uid}
                          </p>
                        </div>
                      </div>
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Trade Ref ID
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.refId}
                          </p>
                        </div>

                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Offer Ref ID
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.offer?.refId}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Volume</p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.volume}{" "}
                            {datas?.offer?.p2pAsset?.asset?.symbol}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Fiat Currency
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.offer?.fiatCurrencyCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Status</p>
                          <p
                            className={`${
                              datas?.status == "PENDING" && "bg-[#eaa421]"
                            }  ${
                              datas?.status == "CANCELLED" && "bg-[#cf142b]"
                            } ${
                              datas?.status == "COMPLETED" && "bg-[#5cb85c]"
                            } text-xs mb-3 p-2 text-white mt-2 w-[100px] flex items-center justify-center rounded-lg`}
                          >
                            {datas?.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Offer Type
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.offer?.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Date</p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {format(datas?.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Offer Rate
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            {datas?.offer?.fiatCurrencyCode}{" "}
                            {datas?.offer?.preferredRate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              )}
              {active === "flag" && (
                <Fade>
                  {!datas?.active ? (
                    <div>
                      <h4 className="font-semibold text-[24px] mt-4 text-base">
                        Deactivate Offer
                      </h4>
                      <div className="pr-10">
                        <p className="text-[12px] pt-4 text-[#141414B2] text-sm">
                          Are you sure you want to Deactivate this offer?
                        </p>
                        <p className="text-[12px] text-[#141414B2] text-sm">
                          Once deactivated, {"it'll"} take time to undone
                        </p>
                        {/* @welloutsmm */}
                        <div className="flex space-x-4 mt-5">
                          <button
                            className="bg-[#FF1E651A] text-[13px] font-semibold text-[#FF1E65] rounded-lg py-2 px-6"
                            onClick={() => {
                              setShow(false);
                              setActive("details");
                            }}
                          >
                            No, Cancel
                          </button>
                          <button
                            onClick={() => setConfirmShow(true)}
                            className="bg-[#FF0000] text-[13px] font-semibold text-white rounded-lg py-2 px-6"
                          >
                            Yes, Deactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-[24px] mt-4 text-base">
                        Activate Offer
                      </h4>
                      <div className="pr-10">
                        <p className="text-[12px] pt-4 text-[#141414B2] text-sm">
                          This offer is currently deactivated, Are you sure you
                          want to re-activate this offer?
                        </p>

                        {/* @welloutsmm */}
                        <div className="flex space-x-4 mt-5">
                          <button
                            className="bg-[#FF1E651A] text-[13px] font-semibold text-[#FF1E65] rounded-lg py-2 px-6"
                            onClick={() => {
                              setShow(false);
                              setActive("details");
                            }}
                          >
                            No, Cancel
                          </button>
                          <button
                            onClick={() => setConfirmShow(true)}
                            className="bg-[#5cb85c] text-[13px] font-semibold text-white rounded-lg py-2 px-6"
                          >
                            Yes, Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Fade>
              )}
            </div>
          </div>

          {/* <ConfirmAction
            show={confirmShow}
            setShow={setConfirmShow}
            children={ConfirmComponent()}
            setOk={handleConfirm}
            title={!datas?.active ? "Deactivate Offer" : "Activate Offer"}
          /> */}
        </DialogContent>
      </Dialog>
      {show && <Fade></Fade>}
      {/* {show && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>} */}
    </>
  );
}

export default PopTrade;
