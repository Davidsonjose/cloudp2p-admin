import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import Input from "@/components/form-control/adduser";
import { Fade } from "react-reveal";
import { addNewAdminUser } from "@/functions/handler/user/admin";
import { getDisputeMessages } from "@/services/backend/p2p.service";
import { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { useMediaQuery } from "@/hooks";
import Select from "react-select";
import { replyAppealMessage } from "@/functions/handler/user/p2p";
import { ResolutionType } from "@/interface/p2p";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DisputeMessage({ open, setOpen, data }: any) {
  const isMobileView = useMediaQuery("(max-width: 640px)");
  const isTabletView = useMediaQuery("(max-width: 840px)");
  const scrollRef = React.useRef<any>();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);
  const [selectedresolution, setSelectedResolution] =
    useState<any>("IN_PROGRESS");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formData = [
    {
      label: "User Name",
      placeholder: "Enter Full Name",
      type: "email",
      register: { ...register("email") },
    },
    {
      label: "Create Password",
      placeholder: "Enter Password",
      type: "password",
      register: { ...register("password") },
    },
  ];

  const handleCreation = () => {
    setMessage("");
    if (message == "") {
      return;
    }
    setLoading(true);
    setMessages([
      ...messages,
      {
        message: message,
        author: "admin",
        status: selectedresolution,
      },
    ]);
    const info = {
      tradeDisputeId: data?.id,
      disputeMessage: message,
      resolution: selectedresolution,
    };
    console.log(info);
    replyAppealMessage({
      data: info,
      setLoading: setLoading,
      setMessage: setMessage,
      setError: setError,
    });
  };

  const getMessages = async (load: boolean) => {
    if (load) {
      setLoading(true);
    }
    try {
      const response = await getDisputeMessages(data?.id);
      const info = response?.data?.reverse();
      setMessages(info);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open == true) {
      const interval = setInterval(() => {
        getMessages(false);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [open]);
  useEffect(() => {
    if (open) {
      getMessages(true);
    }
  }, [open, data]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  function isPDF(url: any) {
    return url.toLowerCase().endsWith(".pdf");
  }

  const handleSelect = (e: any) => {
    setSelectedResolution(e.value);
  };

  const reasolutiontype = [
    "IN_PROGRESS",
    "CANCEL",
    "COMPLETE",
  ] as ResolutionType[];

  const resetModal = () => {
    setOpen(false);
    setMessage("");
    setMessages([]);
    setSelectedResolution("IN_PROGRESS");
  };

  // console.log(messages);

  console.log(data?.P2PTradeDispute?.resolution);
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => ""}
        aria-describedby="alert-dialog-slide-description"
        className="z-[200] "
        PaperProps={{
          style: {
            backgroundColor: "#F6F6F6",
          },
        }}
        fullScreen={isMobileView || isTabletView}
        // style={{borderR}}
      >
        <LoadingSpinner loading={loading} />
        <div className="flex items-center p-4 space-x-4">
          <div
            onClick={() => {
              resetModal();
            }}
            className="h-10 w-10 bg-[#17193F] cursor-pointer text-white flex items-center justify-center rounded-full"
          >
            x
          </div>
          <p>Appeal Tracking</p>
        </div>
        <DialogContent className="lg:w-[600px] h-[500px]">
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-[#17193F] p-6 rounded-lg">
              <div className="px-2 w-[500px] ">
                {messages?.map((data: any, index: number) => (
                  <div
                    key={index}
                    ref={scrollRef}
                    className="rounded-lg py-4 px-3 bg-[#21254B] border-white mb-4"
                  >
                    <div className="flex  justify-between">
                      <p className="text-xs text-white font-semibold">
                        {data?.author?.toLowerCase() == "admin" ? (
                          "me(Admin)"
                        ) : (
                          <>{data?.author}</>
                        )}
                      </p>
                      <div>
                        <p className="text-xs text-[#F6D18C]">
                          {moment(data?.createdAt).format("LT")}
                        </p>
                        <p className="text-xs text-[#F6D18C]">
                          {moment(data?.createdAt).format("L")}
                        </p>
                      </div>
                    </div>
                    <div className="flex  justify-between">
                      <p className="text-base text-white font-semibold">
                        {data?.title}
                      </p>
                    </div>
                    <p className="text-xs mb-3 text-gray-400 mt-2">
                      {data?.message}
                    </p>
                    {data?.author?.toLowerCase() == "admin" && (
                      <>
                        {data?.status ? (
                          <p
                            className={`${
                              data?.status == "IN_PROGRESS" && "bg-[#eaa421]"
                            }  ${data?.status == "CANCEL" && "bg-[#cf142b]"} ${
                              data?.status == "COMPLETE" && "bg-[#5cb85c]"
                            } text-xs mb-3 p-3 text-white mt-2 w-[150px] flex items-center justify-center rounded-lg`}
                          >
                            {data?.status == "CANCEL" && "CANCELLED"}
                            {data?.status == "COMPLETE" && "COMPLETED"}
                            {data?.status == "IN_PROGRESS" && "IN PROGRESS"}
                          </p>
                        ) : (
                          <p
                            className={`${
                              data?.p2pTradeDispute?.resolution ==
                                "IN_PROGRESS" && "bg-[#eaa421]"
                            }  ${
                              data?.p2pTradeDispute?.resolution == "CANCEL" &&
                              "bg-[#cf142b]"
                            } ${
                              data?.p2pTradeDispute?.resolution == "COMPLETE" &&
                              "bg-[#5cb85c]"
                            } text-xs mb-3 p-3 text-white mt-2 w-[150px] flex items-center justify-center rounded-lg`}
                          >
                            {data?.p2pTradeDispute?.resolution == "CANCEL" &&
                              "CANCELLED"}
                            {data?.p2pTradeDispute?.resolution == "COMPLETE" &&
                              "COMPLETED"}
                            {data?.p2pTradeDispute?.resolution ==
                              "IN_PROGRESS" && "IN PROGRESS"}
                          </p>
                        )}
                      </>
                    )}

                    <div>
                      {data?.files?.map((dats: string, index: number) => (
                        <div className="mb-2" key={index}>
                          {isPDF(dats) ? (
                            <a
                              href={dats}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-[#eaa421] rounded-lg mt-4 text-white"
                            >
                              View File
                            </a>
                          ) : (
                            <Image
                              src={dats}
                              width={200}
                              height={200}
                              alt="none"
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        {data?.P2PTradeDispute?.resolution != "CANCEL" &&
        data?.P2PTradeDispute?.resolution != "COMPLETE" ? (
          <div className="sticky lg:w-[600px]   bottom-0">
            <div className=" rounded-b bg-[#17193F] px-3 py-4">
              <p className="text-white text-sm pb-2">Select resolution type:</p>
              <Select
                options={reasolutiontype?.map((item: ResolutionType) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
                defaultInputValue="IN_PROGRESS"
                placeholder="select resolution type "
                className="placeholder:text-xs text-sm mb-5"
                onChange={(e) => handleSelect(e)}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="rounded-full w-[90%] text-[11px] pl-6 pr-12 py-2 focus:outline-none  h-auto bg-white "
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
                {/* </div> */}
                <div className="flex items-center space-x-2">
                  <div
                    onClick={handleCreation}
                    className="w-7 h-7 rounded-full bg-[#eaa421] text-center items-center flex justify-center"
                  >
                    <button className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white">
                      <i className="fa-solid text-white fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=""> */}
          </div>
        ) : null}
      </Dialog>
    </>
  );
}

export default DisputeMessage;
