// import AuthWrapper from 'components/wrappers/auth-wrapper';
// import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import React, { useEffect } from "react";
import { Avater } from "assets";
import { LOGO } from "assets";
import { BALOSH } from "assets";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "components/form-control/input";
import { useState } from "react";
import { getAdminToken } from "common";
import axios from "axios";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
interface mainLayoutTypes {
  children: JSX.Element;
}

function UserEdit(props: any) {
  const token = getAdminToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const { showmodal, setShowModal, datas } = props;
  const { register, handleSubmit, setValue } = useForm();

  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  const formData = [
    {
      label: "Enterprise name",
      placeholder: "enter company name",
      type: "text",
      register: { ...register("companyname") },
    },
    {
      label: "Email address",
      placeholder: "enter company email",
      type: "email",
      register: { ...register("email") },
    },
  ];

  const Select = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="font-semibold pb-2 text-gray-700">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Role</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>
      </>
    )
  );
  const SelectStatus = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="font-semibold pb-2 text-gray-700">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
          <option value="deactivate">Deactivate</option>
        </select>
      </>
    )
  );
  const SelectVisitors = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="font-semibold pb-2 text-gray-700">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0">0</option>
          <option value="3">3</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="unlimited">unlimited</option>
        </select>
      </>
    )
  );
  //   const formData = [
  //     {
  //       label: "COMPANY NAME",
  //       placeholder: "Enter company name",
  //       type: "text",
  //       register: { ...register("companyname") },
  //     },
  //     {
  //       label: "Phone Number",
  //       placeholder: "enter company phone",
  //       type: "number",
  //       register: { ...register("phone") },
  //     },
  //     {
  //       label: "Email Address",
  //       placeholder: "enter company email",
  //       type: "email",
  //       register: { ...register("email") },
  //     },
  //     {
  //       label: "Address",
  //       placeholder: "enter company address",
  //       type: "text",
  //       register: { ...register("address") },
  //     },
  //     {
  //       label: "Description",
  //       placeholder: "enter company description",
  //       type: "text",
  //       register: { ...register("description") },
  //     },
  //     {
  //       label: "Upload NIN/CEPAC {PDF Format Required}",
  //       //   placeholder: "enter company description",
  //       type: "file",
  //       register: { ...register("nin") },
  //     },
  //   ];

  const handleUpdate = (data: any) => {
    // alert("yeah ");
    setErr("");
    setMessage("");
    setLoading(true);

    const info = {
      status: data?.status,
      limit: data?.limit,
      id: datas?.id,
      role: data?.role,
    };
    axiosCreate
      .put(`${API_URL}/staff/update/pro/now`, info)
      .then((data) => {
        setLoading(false);
        setMessage("Update made successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        //   console.log(error);
        setErr(error?.response?.data?.message);
      });
  };

  console.log(datas);

  useEffect(() => {
    setValue("role", datas?.role);
    setValue("status", datas?.status);
    setValue("limit", datas?.limit);
  }, [datas]);
  return (
    <>
      {showmodal ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-lg">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              {loading && (
                <>
                  <LoadingSpinner loading={loading} />
                </>
              )}
              <form
                className="w-[100%] md:w-[70%] lg:w-[100%] lg:h-[50vh]"
                onSubmit={handleSubmit(handleUpdate)}
              >
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div
                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
                    style={{
                      background: `linear-gradient(90deg, rgba(12, 57, 174, 0.588542) 46.76%, #AE0C0C 59.32%, rgba(248, 2, 46, 0.0403111) 122.42%, rgba(12, 67, 174, 0) 122.43%)`,
                    }}
                  >
                    <h3 className="text-xl font-semibold text-white">
                      Edit profile
                    </h3>
                    <div
                      className="text-white bg-gradient-to-r cursor-pointer from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-xmark text-white "></i>
                    </div>
                  </div>
                  {/*body*/}
                  <div className="relative pt-5  overflow-y-auto flex-auto">
                    {message && (
                      <div className="p-4 mb-10 mx-4 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
                        <span className="text-white font-semibold ">
                          {message}
                        </span>
                        <div onClick={() => setMessage("")}>
                          <i className="fa-solid fa-circle-xmark text-white"></i>
                        </div>
                      </div>
                    )}
                    {err && (
                      <div className="p-4 mb-10  rounded-lg mx-3 bg-red-500 flex justify-between items-center">
                        <span className="text-white font-semibold ">{err}</span>
                        <div onClick={() => setErr("")}>
                          <i className="fa-solid fa-circle-xmark text-white"></i>
                        </div>
                      </div>
                    )}
                    <div className="lg:px-36 px-4">
                      <div className="flex mt-5 justify-center items-center">
                        <img
                          src={datas?.image ? datas?.image : Avater}
                          alt=""
                          className="h-12 w-12 rounded-full"
                        />
                      </div>
                      <h3 className="font-bold text-center ">
                        {datas?.firstname}
                      </h3>
                    </div>

                    <div className="px-4 flex justify-between items-center pt-10">
                      <div>
                        <h3 className="text-gray-600">Company</h3>
                      </div>
                      <h3 className="text-[#690000] text-center font-black">
                        {datas?.company?.name}
                      </h3>
                    </div>
                    <div className="mx-4 mt-2">
                      <Select label="Role" {...register("role")} />
                      <SelectStatus label="Status" {...register("status")} />
                    </div>
                    <div className="mt-10 mx-4">
                      <h2 className="text-center underline font-bold ">
                        Visitors management role
                      </h2>
                      <SelectVisitors
                        label="Visitors invite limit(daily)"
                        {...register("limit")}
                      />
                    </div>
                    <div className="flex items-center justify-center mt-10 mb-2 ">
                      <button className="text-white p-3 flex-1 mx-3 bg-green-800 rounded-lg">
                        Update
                      </button>
                    </div>
                  </div>
                  {/*footer*/}
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default UserEdit;
