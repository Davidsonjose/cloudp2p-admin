import MainLayout from "@/layouts";
// import { Route, Routes, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
// import { userData } from "../src/store/reducer/authReducer";
// import { selectUser } from "../../auth/api/slice";
import { useEffect, useState } from "react";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SwapTransaction from "@/features/dashboard/transaction/swaptransactions";
import PtpTransaction from "@/features/dashboard/transaction/p2pOffers";
function DashboardRoutes() {
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();

  return (
    <MainLayout>
      <PtpTransaction />
    </MainLayout>
  );
}

export default DashboardRoutes;
