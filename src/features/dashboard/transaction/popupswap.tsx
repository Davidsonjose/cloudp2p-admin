import ToastMessage from "@/components/toast/ToastMessage";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { Dialog, DialogContent, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
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
function Popsend({ show, setShow, datas }: any) {
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(false);
  const [toastpop, setToastPop] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
        <LoadingSpinner loading={loading} />
        <ToastMessage show={toastpop} success={message} error={error} />
        <DialogContent className="lg:w-[600px] w-[340px] overflow-x-hidden">
          <Fade>
            <div className="  bg-white rounded-lg">
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
                  Flag Transaction
                </button> */}
                </div>

                {active === "details" && (
                  <Fade>
                    <div className="flex-1">
                      <div className="flex justify-between space-x-16 mt-5">
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Amount
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.baseAmount}{" "}
                              {datas?.baseAsset?.asset?.symbol}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Sent From
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.baseAsset?.asset?.symbol}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Gas Fee
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {Number(datas?.providerFeeRemitted)?.toFixed(6)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Conversion Rate
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {Number(datas?.conversionRate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              User PayId
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.user?.uid}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Ref ID
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.refId}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Swap To
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.quoteAsset?.asset?.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Status
                            </p>
                            <p className="py-1 px-4 bg-[#3AB83A1A] text-green-800 rounded-lg mt-1">
                              {datas?.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Receiver Address{" "}
                            </p>
                            <p className="pt-2 text-[#141414] text-[12px] break-all w-[100px] font-semibold">
                              {datas?.destinationAddress}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">Date</p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {format(datas?.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )}
                {active === "flag" && (
                  <Fade>
                    <div>
                      <h4 className="font-semibold text-[24px] mt-4 text-base">
                        Flag Transaction
                      </h4>
                      <div className="pr-10">
                        <p className="text-[12px] pt-4 text-[#141414B2] text-sm">
                          Are you sure you want to flag this transaction?
                        </p>
                        <p className="text-[12px] text-[#141414B2] text-sm">
                          Once flagged, {"it'll"} take time to undone
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
                          <button className="bg-[#FF0000] text-[13px] font-semibold text-white rounded-lg py-2 px-6">
                            Yes, Flag
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )}
              </div>
            </div>
          </Fade>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Popsend;
