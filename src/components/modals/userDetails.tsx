import ToastMessage from "@/components/toast/ToastMessage";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { Dialog, DialogContent, TextField, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { format } from "timeago.js";
import moment from "moment";
import ConfirmAction from "./deactivateOfferPrompt";
import { activateUser, deactivateUser } from "@/functions/handler/user";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});
function UserDetailsPop({ show, setShow, datas }: any) {
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(false);
  const [toastpop, setToastPop] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");

  const [confirmShow, setConfirmShow] = useState(false);

  const handleDeactivate = async () => {
    setError("");
    setToastPop(false);
    deactivateUser({
      setLoading,
      setError,
      userId: datas?.id,
      setMessage,
      reason,
    });
  };

  useEffect(() => {
    if (error) {
      setToastPop(true);
    }
    if (message) {
      setToastPop(true);
      setConfirmShow(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [error, message]);

  const ConfirmComponent = () => {
    return (
      <div>
        {datas?.active ? (
          <>
            <p>
              You are about to deactivate a user. please enter the reason below.
              <TextField
                id="standard-basic"
                label="Reason"
                variant="standard"
                className="w-[100%]"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
              />
            </p>
          </>
        ) : (
          <p>
            You are about to reactivate a user. To continue, confirm using the
            button below.
          </p>
        )}
      </div>
    );
  };

  const handleConfirm = () => {
    setError("");
    setToastPop(false);

    if (datas?.active) {
      if (!reason) {
        setToastPop(true);
        setError("Please enter the reason");
        return;
      }
      handleDeactivate();
    } else {
      // handleA
      activateUser({
        setLoading,
        setError,
        userId: datas?.id,
        setMessage,
      });
    }
  };

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
        <DialogContent className="lg:w-[630px] w-[340px] overflow-x-hidden">
          <Fade>
            <div className="  bg-white  rounded-lg">
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
                    {datas?.active ? "Deactivate User" : "Activate User"}
                  </button>
                </div>

                {active === "details" && (
                  <Fade>
                    <div className="flex-1">
                      <div className="flex justify-between space-x-16 mt-5">
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Firstname
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.firstName}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Lastname
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Email
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Kyc Level
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.kycLevel}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Phone Number
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.phoneNumber
                                ? datas?.phoneNumber
                                : "Not Added"}
                            </p>
                          </div>
                        </div>
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              User Id
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.uid}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Country
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.country}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Date Registered
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {moment(datas?.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Last Login
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.loggedinAt
                                ? moment(datas?.loggedinAt).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )
                                : "Never logged in"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Referral Code
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.referralCode}
                            </p>
                          </div>
                        </div>
                        <div className="flex-col justify-center items-center space-y-5">
                          <div>
                            <p className="text-[12px] text-[#141414B2]">Role</p>
                            <p className="py-1 rounded-lg mt-1">
                              {datas?.role}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              User Status
                            </p>
                            <p className="pt-2 text-[#141414] text-[14px] font-semibold">
                              {datas?.active ? "Active" : "Deactivated"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-[#141414B2]">
                              Default Currency Code
                            </p>
                            <p className="pt-2 text-[#141414] text-[16px] font-semibold">
                              {datas?.settings?.defaultCurrencyCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )}
                {active === "flag" && (
                  <Fade>
                    {datas?.active ? (
                      <div>
                        <h4 className="font-semibold text-[24px] mt-4 text-base">
                          Deactivate User
                        </h4>
                        <div className="pr-10">
                          <p className="text-[12px] pt-4 text-[#141414B2] text-sm">
                            Are you sure you want to Deactivate this user?
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
                          Activate User
                        </h4>
                        <div className="pr-10">
                          <p className="text-[12px] pt-4 text-[#141414B2] text-sm">
                            This user is currently deactivated, Are you sure you
                            want to re-activate this user?
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
          </Fade>

          <ConfirmAction
            show={confirmShow}
            setShow={setConfirmShow}
            children={ConfirmComponent()}
            setOk={handleConfirm}
            title={!datas?.active ? "Deactivate User" : "Activate User"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserDetailsPop;
