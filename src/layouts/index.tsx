import { useEffect, useState } from "react";
import Sidebar from "@/components/siderbar";
import { admin, manager } from "./data";
import { Avater } from "@/assets";
import { BsBell } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/api/slice";
import { Dropdown } from "@/components/dropdown";
import axios from "axios";
import API_URL from "@/config";
import { getAdminToken, getUser } from "@/common";
// import { useNavigate } from "react-router-dom";

interface mainLayoutTypes {
  children: JSX.Element;
  // notification: any;
}

function MainLayout({ children }: mainLayoutTypes) {
  const users = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const token = getAdminToken();
  const user = useSelector(getUser);
  // const navigate = useNavigate();
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  const [isSideBarVisible, setIsSideBarVisible] = useState("hidden");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  // const [manager, setManager] = useState("");
  const currentUser = useSelector(selectUser);
  function openSidebar() {
    if (isSideBarVisible === "hidden") {
      setIsSideBarVisible("block");
      setOpen(true);
    } else {
      setIsSideBarVisible("hidden");
      setOpen(false);
    }
  }

  // const { notification } = props;
  function handleClose() {
    if (isSideBarVisible === "block") {
      setIsSideBarVisible("hidden");
      setOpen(false);
    }
  }

  const notification = [] as any;

  // console.log(socket)
  return (
    <div className="w-screen  relative  h-screen flex justify-between">
      <Sidebar
        data={users?.role === "admin" ? admin : manager}
        isSideBarVisible={isSideBarVisible}
        openSidebar={openSidebar}
        open={open}
        setIsSideBarVisible={setIsSideBarVisible}
      />
      <div
        className="h-full w-full lg:w-[80%] bg-[#F2ECEC] overflow-auto [@media(max-width:767px)]:scrollbar-hide "
        onClick={handleClose}
      >
        <div className="  bg-[#F2ECEC]  sticky top-0 z-20  rounded-b-2xl h-12 flex justify-between  items-center shadow-header  py-8 px-6 lg:px-10">
          <div className="shadow-header   block lg:hidden rounded-full p-2 bg-black cursor-pointer">
            <VscThreeBars color="#ffffff" className="" onClick={openSidebar} />
          </div>
          {currentUser?.firstname && (
            <div className="">
              {currentUser?.role === "manager" ? (
                <>
                  <span>{"Welcome back, "}</span>{" "}
                  <span className="font-bold capitalize">
                    {currentUser?.firstname}
                  </span>
                </>
              ) : (
                <>
                  <span>{"Welcome back, "}</span>{" "}
                  <span className="font-bold capitalize">
                    {currentUser?.role}
                  </span>
                </>
              )}
            </div>
          )}
          <div>
            <div className="flex justify-center items-center">
              <div className="flex">
                <BsBell
                  size={"1.5em"}
                  className="cursor-pointer"
                  // onClick={() => handleNotification()}
                />
                {user?.notificationseen === false ? (
                  <div className="rounded-lg w-5 h-5 bg-red-600 flex items-center justify-center">
                    <div className="text-white text-center items-center">
                      {user?.newnotification}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <Dropdown view={view} setView={setView} />
            </div>
          </div>

          {view && (
            <div
              className={`absolute h-[500px] overflow-y-scroll z-50 px-4 w-[90%] lg:w-[30%] shadow-lg top-[100%] right-[5%] lg:right-[10%] bg-white   rounded`}
            >
              <p className="pt-2 text-semibold text-gray-600 text-sm">
                Notifications
              </p>
              {loading ? (
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {notification?.length === 0 && (
                    <div className="bg-green-400 text-white p-4  mx-3 mt-5 rounded-lg">
                      No notifications
                    </div>
                  )}
                  {notification?.map((data: any, index: any) => (
                    <div className="mt-3 mb-4" key={index}>
                      <a
                        className="dropdown-item preview-item"
                        // href="/admin/user/notifications"
                        //   key={data?.id}
                      >
                        <div className="flex items-center justify-between space-x-5">
                          <img
                            src={Avater}
                            alt="imag"
                            className="profile-pic rounded-full w-10 h-10"
                          />
                          <div className="preview-item-content flex-grow">
                            <h6 className="font-bold text-gray-600">
                              {data?.notificationtitle}
                            </h6>
                            <p className="text-sm text-gray-400">
                              {data?.message}
                            </p>
                            {data?.notificationtype ===
                            "verificationmanager" ? (
                              <div className="flex items-center space-x-3">
                                {data?.managerapplicationid?.approved ===
                                true ? (
                                  <button
                                    className="p-2 mt-2 bg-green-100 rounded "
                                    disabled
                                  >
                                    Approved
                                  </button>
                                ) : (
                                  <>
                                    {data?.managerapplicationid?.disapproved ? (
                                      <button
                                        className="p-2 mt-2 bg-gray-400 rounded"
                                        disabled
                                      >
                                        Disapproved
                                      </button>
                                    ) : (
                                      <>
                                        {/* <button
                                        className="p-2 mt-2 bg-green-400 rounded text-white"
                                        onClick={() =>
                                          handleApprove(
                                            data?.managerapplicationid?._id
                                          )
                                        }
                                      >
                                        Approve
                                      </button> */}
                                      </>
                                    )}
                                  </>
                                )}

                                <button
                                  onClick={() => {
                                    setView(false);
                                    // navigate(
                                    //   "/dashboard/admin/manager-details",
                                    //   {
                                    //     state: data?.managerapplicationid,
                                    //   }
                                    // );
                                  }}
                                  className="p-2 mt-2 bg-yellow-400 rounded text-white"
                                >
                                  View
                                </button>
                                {/* {!data?.managerapplicationid?.disapproved && (
                                  <button
                                    onClick={() => handleDelete(data?._id)}
                                    className="p-2 mt-2 bg-red-400 rounded text-white"
                                  >
                                    Delete
                                  </button>
                                )} */}
                              </div>
                            ) : (
                              <>
                                {/* <button
                                  onClick={() => handleDelete(data?._id)}
                                  className="p-2 mt-2 bg-red-400 rounded text-white"
                                >
                                  Delete
                                </button> */}
                              </>
                            )}
                            {data?.notificationtype === "information" && (
                              <button
                                onClick={() => {
                                  setView(false);
                                  // navigate(
                                  //   "/dashboard/manager/information/chat",
                                  //   {
                                  //     state: data?.informationid,
                                  //   }
                                  // );
                                }}
                                className="p-2 mt-2 bg-yellow-400 rounded text-white"
                              >
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </a>
                      <div className="border-b-2 mt-2"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        <div className="lg:p-10 bg-[#5A5A5A] z-0">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
