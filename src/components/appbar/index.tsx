import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "@/components/dropdown";
import { Avater, Avatars, Search } from "@/assets";
import { BsBell } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import SearchBar from "./searchbar";
import NotAndProfile from "./notandprofile";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/api/slice";
import { useMediaQuery } from "@/hooks";
import { useProSidebar } from "react-pro-sidebar";
import { getAdmin } from "@/common";
function AppBar({
  openSidebar,
  // user,
  handleNotification,
  view,
  setView,
  notification,
  loading,
  breakPoint,
  setBreakPoint,
}: any) {
  const user = getAdmin();
  // const user = useSelector(selectUser);
  const isMobileView = useMediaQuery("(max-width: 640px)");
  const isTabletView = useMediaQuery("(max-width: 840px)");
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const BreakPoint = () => {
    if (isMobileView || isTabletView) {
      setBreakPoint(!breakPoint);
      toggleSidebar();
    } else {
      collapseSidebar();
    }
  };
  return (
    <>
      <div className="z-40  bg-[#FFFFFF]  sticky top-6 lg:top-0 z-36  rounded-b-2xl h-5 lg:h-12 flex justify-between  items-center shadow-header  py-6 lg:py-10 px-6 lg:px-10">
        <div className="flex items-center space-x-1">
          {isMobileView && (
            <div
              onClick={() => BreakPoint()}
              className="bg-[#17193F] cursor-pointer h-[40px] flex justify-center items-center w-[40px] rounded-full"
            >
              <i className="fa-solid text-white fa-bars  "></i>
            </div>
          )}
          <h3 className="font-semibold text-sm">
            Good Morning {user?.firstName}
          </h3>
        </div>

        {/* Search section */}
        <SearchBar />

        {/* notification and profile */}
        <NotAndProfile
          user={user}
          handleNotification={handleNotification}
          view={view}
          setView={setView}
          loading={loading}
          notification={notification}
        />
      </div>
    </>
  );
}

export default AppBar;
