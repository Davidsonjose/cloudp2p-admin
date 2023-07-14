import { useEffect, useState } from "react";
import Sidebar from "@/components/siderbar";
import { manager, supervisor, support } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { reset, selectUser, setUser } from "@/features/auth/api/slice";
import axios from "axios";
import { getAdmin, getAdminToken, getRefresh } from "@/common";
import AppBar from "@/components/appbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface mainLayoutTypes {
  children: JSX.Element;
  // notification: any;
}

function MainLayout({ children }: mainLayoutTypes) {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const token = getAdminToken();
  const user = getAdmin();
  // const navigate = useNavigate();
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  const [breakPoint, setBreakPoint] = useState(false);
  const [isSideBarVisible, setIsSideBarVisible] = useState("hidden");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  // const [manager, setManager] = useState("");

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 2000); // Simulating a 2-second page load

    return () => {
      clearTimeout(timer);
    };
  }, []);
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

  const verify = getRefresh();
  const logged = token !== null && verify !== null;

  useEffect(() => {
    if (!logged) {
      localStorage.clear();
      dispatch(reset());
      router.push("/auth/login");
    }
  }, []);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime") || String;
    if (expireTime < Date.now().toFixed()) {
      localStorage.clear();
      dispatch(reset());
      router.push("/auth/login");
      // navigate("/auth/login");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 1800000;

    localStorage.setItem("expireTime", expireTime.toFixed());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("mousemove", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  const handleRole = () => {
    if (user?.role === "SUPERVISOR") {
      return supervisor;
    } else if (user?.role === "SUPPORT") {
      return support;
    } else if (user?.role === "MANAGER") {
      return manager;
    }
  };

  const userRoles = handleRole();
  console.log(isPageLoaded);
  return (
    <div className="w-screen  relative bg-[#FAFAFA]   h-screen flex justify-between">
      {/* {isMobileView} */}
      {/* {isPageLoaded && isMob ? ( */}
      <Sidebar
        data={userRoles}
        isSideBarVisible={isSideBarVisible}
        openSidebar={openSidebar}
        open={open}
        setIsSideBarVisible={setIsSideBarVisible}
        breakPoint={breakPoint}
        setBreakPoint={setBreakPoint}
      />
      {/* ) : ( */}
      {/* <></> */}
      {/* )} */}
      <div
        className="h-full  w-full lg:w-[81.5%] bg-[#FFFFFF] overflow-auto [@media(max-width:767px)]:scrollbar-hide "
        onClick={handleClose}
      >
        <AppBar
          openSidebar={openSidebar}
          user={user}
          handleNotification={handleNotification}
          view={view}
          handleClose={handleClose}
          notification={notification}
          setLoading={setLoading}
          setBreakPoint={setBreakPoint}
        />
        <div className="lg:p-10 bg-[#FAFAFA] z-0">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
