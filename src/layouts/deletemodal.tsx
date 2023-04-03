// import AuthWrapper from 'components/wrappers/auth-wrapper';
// import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import React, { useEffect, useState } from "react";
import { LOGO } from "assets";
import { BALOSH } from "assets";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import Input from "components/form-control/input";
import { getAdminToken } from "common";
import axios from "axios";
import API_URL from "config";
import LoadingSpinner from "./loadingSpinner";
interface mainLayoutTypes {
  children: JSX.Element;
}

function DeleteModal(props: any) {
  const { url, title, id, writeup } = props;
  const token = getAdminToken();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });

  const { showmodal, setShowModal } = props;

  const handleDelete = (e: any) => {
    // setShow(false);
    // const deleteurl = API_URL + "/admin/delete-order/" + id;
    // console.log(id);
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMessage("");
    axiosCreate
      .delete(`${url}${id}`)
      .then(({ data }) => {
        setLoading(false);
        setMessage(`${title} has been deleted successfully`);

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        setErr(err?.response?.data?.data);
        setLoading(false);
      });

    // if (logout === true) {
    //   setTimeout(() => {
    //     removeUserSession(), navigate("/auth");
    //   }, 4000);
    //   // setTimeout(() => setMessage("Logout successfull"), 2000);
    // }
  };

  return (
    <>
      {showmodal ? (
        <>
          <div className="w-screen h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-lg">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div
                  className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
                  style={{
                    background: `linear-gradient(90deg, rgba(12, 57, 174, 0.588542) 46.76%, #AE0C0C 59.32%, rgba(248, 2, 46, 0.0403111) 122.42%, rgba(12, 67, 174, 0) 122.43%)`,
                  }}
                >
                  <h3 className="text-3xl font-semibold text-white">
                    Delete {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative pt-5 lg:px-36 px-4 mb-10 overflow-y-auto flex-auto">
                  {loading ? (
                    <LoadingSpinner loading={loading} setLoading={setLoading} />
                  ) : (
                    <>
                      {message && (
                        <div className="p-4 mb-10 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
                          <span className="text-white font-semibold ">
                            {message}
                          </span>
                          <div onClick={() => setMessage("")}>
                            <i className="fa-solid fa-circle-xmark text-white"></i>
                          </div>
                        </div>
                      )}
                      {err && (
                        <div className="p-4 mb-10 rounded-lg bg-red-500 flex justify-between items-center">
                          <span className="text-white font-semibold ">
                            {err}
                          </span>
                          <div onClick={() => setErr("")}>
                            <i className="fa-solid fa-circle-xmark text-white"></i>
                          </div>
                        </div>
                      )}

                      <strong>{writeup}</strong>
                    </>
                  )}
                  <br />
                </div>
                {/*footer*/}
                <div className="flex mb-4 items-center justify-center">
                  <button
                    className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default DeleteModal;
