import MainLayout from "@/layouts";
// import { Route, Routes, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
// import { userData } from "../src/store/reducer/authReducer";
// import { selectUser } from "../../auth/api/slice";
import { useEffect, useState } from "react";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import SendAndReceive from "@/features/dashboard/transaction/sendandreceive";
function DashboardRoutes() {
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();

  return (
    <MainLayout>
      <SendAndReceive />
    </MainLayout>
  );
}

export default DashboardRoutes;
