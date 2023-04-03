import { Avater } from "assets";
import axios from "axios";
import { getAdminToken } from "common";
import API_URL from "config";
import { useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
function ManagerDetails() {
  const token = getAdminToken();
  const navigate = useNavigate();
  const [validity, setValidity] = useState("");
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  const { disapproved, approved } = state;

  const month3Calculation = () => {
    var date = new Date();
    const formatting = moment(date).format("l");
    const splittingdate = formatting.split("/");
    var monthexpireddate = new Date(
      date.getFullYear(),
      date.getMonth() + 3,
      Number(splittingdate[1])
    );

    return monthexpireddate;
  };
  const month6Calculation = () => {
    var date = new Date();
    const formatting = moment(date).format("l");
    const splittingdate = formatting.split("/");
    var monthexpireddate = new Date(
      date.getFullYear(),
      date.getMonth() + 6,
      Number(splittingdate[1])
    );

    return monthexpireddate;
  };
  const yearCalculation = () => {
    var date = new Date();
    const formatting = moment(date).format("l");
    const splittingdate = formatting.split("/");
    var monthexpireddate = new Date(
      date.getFullYear(),
      date.getMonth() + 12,
      Number(splittingdate[1])
    );

    return monthexpireddate;
  };

  const expiredThree = month3Calculation();
  const expiredSix = month6Calculation();
  const expiredYear = yearCalculation();
  const handleApprove = () => {
    setLoading(true);
    const handleValidity = () => {
      if (validity === "3 months") {
        return expiredThree;
      } else if (validity === "6 months") {
        return expiredSix;
      } else if (validity === "12 months") {
        return expiredYear;
      } else {
        return "";
      }
    };
    axiosCreate
      .post(`${API_URL}/admin/manager/approve`, {
        manager: state?._id,
        validityperiod: validity,
        expiresAt: handleValidity(),
      })
      .then(({ data }) => {
        axiosCreate
          .put(`${API_URL}/staff/update/${data?.payload[0]?.manager}`, {
            token: data?.payload[0]?.id,
          })
          .then(({ data }) => {
            setMessage("Approved successfully");
            // window.location.reload();
            setLoading(false);
            setTimeout(() => {
              setLoading(false);
              window.location.href= "/dashboard/admin";
            }, 1200);
          });
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleDisapprove = () => {
    setLoading(true);
    // window.location.href = "/dashboard/admin";
    axiosCreate
      .post(`${API_URL}/admin/manager/disapprove`, { manager: state?._id })
      .then(({ data }) => {
        setLoading(false);
        setMessage("Disapproved successfully");
        // window.location.reload();
        setTimeout(() => {
          setLoading(false);
          window.location.href= "/dashboard/admin";
        }, 1200);
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  };

  // here is approved
  const Select2 = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <div className="flex items-center justify-center  lg:w-[200px] sm:w-full">
        <div>
          <label className="font-semibold pb-2 text-center text-gray-700">
            {label}
          </label>
          <select
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select validity period</option>
            <option value="3 months">3 month</option>
            <option value="6 months">6 month</option>
            <option value="1 year">1 year</option>
          </select>
        </div>
      </div>
    )
  );

  return (
    <div className="flex-1 p-4  bg-white shadow-wrapper">
      {loading ? (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto h-screen">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {message && (
            <div className="p-4 mx-10 mb-10 rounded-lg bg-green-500 flex justify-between items-center">
              <div>
                <span className="text-white font-semibold ">{message}</span>
              </div>
              <div onClick={() => setMessage("")}>
                <i className="fa-solid fa-circle-xmark text-white"></i>
              </div>
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: state?.applicationdetails }}
          ></div>
          {!approved || !disapproved  ? (
            <div className="flex mt-4 justify-center items-center space-x-5">
              <Select2 label="Manager validity period" />
            </div>
          ) : null}
          {disapproved ? (
            <div className="flex mt-4 justify-center items-center space-x-5">
              <button className="bg-gray-300 p-4 rounded-lg" disabled>
                Disapproved
              </button>
            </div>
          ) : (
            <>
              {approved === true ? (
                <div className="flex mt-4 justify-center items-center space-x-5">
                  <button className="bg-green-700 p-4 rounded-lg text-white">
                    Approved
                  </button>
                </div>
              ) : (
                <div className="flex mt-4 justify-center items-center space-x-5">
                  <button
                    className="bg-green-700 p-4 rounded-lg text-white"
                    onClick={() => handleApprove()}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-700 p-4 rounded-lg text-white"
                    onClick={() => handleDisapprove()}
                  >
                    Disapprove
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ManagerDetails;
