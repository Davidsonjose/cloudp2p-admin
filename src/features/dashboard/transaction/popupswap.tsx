import React, { useState } from "react";
import { Fade } from "react-reveal";

function Popsend({ show, setShow }: any) {
  const [active, setActive] = useState("details");
  return (
    <>
      {show && (
        <Fade>
          <div className="absolute  bg-white rounded-lg z-50 left-[50%]">
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
                <button
                  onClick={() => setActive("flag")}
                  className={`rounded ${
                    active == "details"
                      ? "border-[#1414141A] bg-white border "
                      : "bg-[#17193F] text-white "
                  }  px-4 py-2`}
                >
                  Flag Transaction
                </button>
              </div>

              {active === "details" && (
                <Fade>
                  <div className="flex-1">
                    <div className="flex justify-between space-x-16 mt-5">
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Fee</p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            0.2348990
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Sent From
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            USDT
                          </p>
                        </div>
                      </div>
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Transaction ID
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            0993029011
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">
                            Swap To
                          </p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            Binance 30
                          </p>
                        </div>
                      </div>
                      <div className="flex-col justify-center items-center space-y-5">
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Status</p>
                          <p className="py-1 px-4 bg-[#3AB83A1A] text-green-800 rounded-lg mt-1">
                            success
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px] text-[#141414B2]">Date</p>
                          <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                            19/04/2023
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
      )}
      {/* {show && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>} */}
    </>
  );
}

export default Popsend;
