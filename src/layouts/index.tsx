import { useEffect, useState } from "react";
import Sidebar from "@/components/siderbar";
import {  mainadmin } from "./data";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/api/slice";
import axios from "axios";
import { getAdminToken } from "@/common";
import AppBar from "@/components/appbar";
import Image from "next/image";

interface mainLayoutTypes {
  children: JSX.Element;
  // notification: any;
}

function MainLayout({ children }: mainLayoutTypes) {
  const users = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const token = getAdminToken();
  const user = {};
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

  const notification = [
    {
      notificationtype: "Thire",
      notificationtitle: "Transfer received",
      message: "This is an important message",
    },
  ] as any;

  // console.log(socket)

  const handleNotification = () => {
    setView(!view);
  };
  return (
    <div className="w-screen  relative   h-screen flex justify-between">
      <Sidebar
        data={mainadmin}
        isSideBarVisible={isSideBarVisible}
        openSidebar={openSidebar}
        open={open}
        setIsSideBarVisible={setIsSideBarVisible}
      />
      <div
        className="h-full  w-full lg:w-[81.5%] bg-[#FFFFFF] overflow-auto [@media(max-width:767px)]:scrollbar-hide "
        onClick={handleClose}
      >
        <AppBar
          openSideBar={openSidebar}
          user={user}
          handleNotification={handleNotification}
          view={view}
          handleClose={handleClose}
          notification={notification}
          setLoading={setLoading}
        />
        <div className="lg:p-10 bg-[#FAFAFA] z-0">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
