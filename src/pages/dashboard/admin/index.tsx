import MainLayout from "@/layouts";
// import { Route, Routes, useNavigate } from "react-router-dom";

import Dashboard from "../../../features/dashboard/admin/Dashboard";

import { useSelector } from "react-redux";
// import { userData } from "../src/store/reducer/authReducer";

import { useEffect, useState } from "react";
import HeaderWidget from "@/components/widgets/HeaderWidget";
import { selectUser } from "@/features/auth/api/slice";
function DashboardRoutes() {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default DashboardRoutes;
