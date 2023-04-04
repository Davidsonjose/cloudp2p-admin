import React from "react";
import Image from "next/image";
import { Dropdown } from "@/components/dropdown";
import { Avater, Avatars, Search } from "@/assets";
import { BsBell } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import LeftWidget from "./leftwidget";
import Notification from "./notification";
function NotAndProfile({
  user,
  handleNotification,
  view,
  setView,
  loading,
  notification,
}: any) {
  return (
    <>
      {/* notification and user left display*/}
      <LeftWidget
        handleNotification={handleNotification}
        user={user}
        view={view}
        setView={setView}
      />

      <Notification view={view} loading={loading} notification={notification} />
    </>
  );
}

export default NotAndProfile;
