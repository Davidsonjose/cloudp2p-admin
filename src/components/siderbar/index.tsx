import { COMPANY_LOGO, OVERVIEW } from "@/assets";
import ItemMenu from "./item-menu";
import { AiOutlineClose } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "@/hooks";
import { selectUser } from "@/features/auth/api/slice";
import { getAdmin } from "@/common";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddUser from "../modals/adduser";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
function Sidebars(props: any) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useRouter();
  const isMobileView = useMediaQuery("(max-width: 640px)");
  const isTabletView = useMediaQuery("(max-width: 840px)");
  const user = useSelector(selectUser);
  const users = useSelector(getAdmin);
  const { setIsSideBarVisible, data, breakPoint, setBreakPoint } = props;

  //   <AiOutlineClose
  //   color="#ffffff"
  //   className=""
  //   onClick={props.openSidebar}
  // />

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  const [width, setWidth] = useState<any>("");
  const [collapse, setCollapse] = useState(false);
  const [display, setDisplay] = useState("");

  function getSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", getSize);
    if (width < 400) {
      setCollapse(true);
      setDisplay("");
      setBreakPoint(true);
    } else {
      setDisplay("block");
      setCollapse(false);
      setBreakPoint(false);
    }
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [window.innerWidth]);

  const widthcheck = isTabletView || isMobileView ? "block" : "hidden";
  return (
    <Sidebar
      backgroundColor="#00011B"
      rootStyles={{
        position: "relative",
        width: isMobileView ? "" : "300px",
      }}
      // breakPoint={"md"}
      // collapsedWidth={collapse}
      // breakPoint={breakPoint && "sm"}
      breakPoint={breakPoint && "sm"}
      // width="400"
      // collapsed={collapsed}
      // rtl={rtl}
      // rtl
    >
      <div className="flex justify-between flex-col ">
        <div className="mb-8  ">
          <div
            className={`${
              isMobileView ? "justify-between mx-4" : "justify-center"
            } flex  items-center `}
          >
            <div className="flex space-x-4 mt-5 justify-center items-center">
              <Image
                src={COMPANY_LOGO}
                alt=""
                // height={32}
                // width={32}
                className="h-20 w-12 self-center rounded-full cursor-pointer "
              />
              <h4 className="text-white text-[18px] font-semibold">CloudP2P</h4>
            </div>
            <div
              onClick={() => toggleSidebar()}
              className={`${widthcheck} bg-white h-10 w-10 rounded-full flex items-center justify-center`}
            >
              <p className="font-semibold">X</p>
            </div>
          </div>
          <div
            className={`${
              active === "home" ? "bg-[#E9EAFF] " : ""
            } mt-10 flex items-center justify-center px-14 space-x-4 cursor-pointer mb-5`}
            onClick={() => navigate.push("/dashboard/admin")}
          >
            <Image
              src={OVERVIEW}
              alt=""
              // height={32}
              // width={32}
              className="h-5 w-5 self-center rounded-full cursor-pointer "
            />
            <span
              className={`py-4 text-center ${active === "" && "text-white"}`}
            >
              Overview
            </span>
          </div>
          {props?.data?.map((dats: any) => (
            <>
              <div>
                <p className="text-[#FFFFFF99] pb-6 font-semibold text-[10px] pt-5 flex mx-12">
                  {dats?.category}
                </p>
              </div>
              {dats?.sub?.map((dats: any, i: any) => (
                <div
                  key={i}
                  onClick={() => {
                    // setActive("");
                    if (dats.title === "Add User") {
                      setOpen(true);
                      setIsSideBarVisible("hidden");
                    } else {
                      navigate.push(`${dats.path}`);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div
                    className="flex mx-14 pb-9 items-center space-x-4"
                    // key={i}
                  >
                    <Image
                      src={dats?.icon}
                      alt=""
                      // height={32}
                      // width={32}
                      className="h-[10.06px] w-[11.37px] self-center rounded-full cursor-pointer "
                    />
                    <h3 className="text-white text-[14px]">{dats?.title}</h3>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

export default Sidebars;
