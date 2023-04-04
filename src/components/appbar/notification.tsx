import React from "react";
import { Avater, Avatars, Search } from "@/assets";
import Image from "next/image";

function Notification({ view, loading, notification }: any) {
  return (
    <>
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
                  <a className="dropdown-item preview-item">
                    <div className="flex items-center justify-between space-x-5">
                      <Image
                        src={Avatars}
                        alt="imag"
                        className="profile-pic w-10 h-10"
                      />
                      <div className="preview-item-content flex-grow">
                        <h6 className="font-bold text-gray-600">
                          {data?.notificationtitle}
                        </h6>
                        <p className="text-sm text-gray-400">{data?.message}</p>
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
    </>
  );
}

export default Notification;
