import React from "react";
import { Dropdown } from "@/components/dropdown";
import { Avater, Avatars, Search } from "@/assets";
import { BsBell } from "react-icons/bs";


function LeftWidget({ handleNotification, user, view, setView }: any) {
  return (
    <div className="flex justify-center  items-center">
      <div className="flex">
        <div className="bg-[#F5F5F5] py-2 rounded px-2">
          <BsBell
            size={"0.7em"}
            className="cursor-pointer"
            onClick={() => handleNotification()}
          />
        </div>
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
  );
}

export default LeftWidget;
