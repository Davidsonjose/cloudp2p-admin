import MainLayout from "@/layouts";
// import { Route, Routes, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
// import { userData } from "../src/store/reducer/authReducer";
// import { selectUser } from "../../auth/api/slice";
import { useEffect, useState } from "react";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SwapTransaction from "@/features/dashboard/transaction/swaptransactions";
import PtpTransaction from "@/features/dashboard/transaction/p2ptransaction";
function DashboardRoutes() {
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime") || String;
    if (expireTime < Date.now().toFixed()) {
      localStorage.clear();
      // navigate("/auth/login");
      alert("your session has expired");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 180000;

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
  return (
    <MainLayout>
      <PtpTransaction />
    </MainLayout>
  );
}

export default DashboardRoutes;
