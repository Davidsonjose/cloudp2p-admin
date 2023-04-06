import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "@/components/dropdown";
import { Avater, Avatars, Search } from "@/assets";
import { BsBell } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import SearchBar from "./searchbar";
import NotAndProfile from "./notandprofile";
function AppBar({
  openSidebar,
  user,
  handleNotification,
  view,
  setView,
  handleClose,
  notification,
  loading,
  setLoading,
}: any) {
  return (
    <>
      <div className="  bg-[#FFFFFF]  sticky top-6 lg:top-0 z-36  rounded-b-2xl h-5 lg:h-12 flex justify-between  items-center shadow-header  py-6 lg:py-10 px-6 lg:px-10">
        <div className="shadow-header   block lg:hidden rounded-full p-2 bg-black cursor-pointer">
          <VscThreeBars color="#ffffff" className="" onClick={openSidebar} />
        </div>
        <h3>Good Morning</h3>


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
