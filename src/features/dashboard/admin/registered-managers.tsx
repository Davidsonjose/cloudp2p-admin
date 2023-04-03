import React, { useState, useEffect } from "react";
import ManagerTable from "layouts/managertable";
import axios from "axios";
import API_URL from "config";
import { getAdminToken } from "common";
import CompanyModal from "layouts/company/companymodal";
import LoadingSpinner from "layouts/loadingSpinner";
import ManagerModal from "layouts/manager/managermodal";
import DeleteModal from "layouts/deletemodal";
import UserEdit from "layouts/profile/userprofile";
function RegisteredManagers() {
  const token = getAdminToken();
  const [showmodaldelete, setShowModalDelete] = useState(false);
  const [showmodaledit, setShowModalEdit] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [countries, setCountries] = useState([]);
  const [datas, setDatas] = useState<any>(null);
  const [datas2, setDatas2] = useState<any>(null);
  const [managers, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  useEffect(() => {
    setLoading(true);
    axiosCreate
      .get(`${API_URL}/admin/manager`)
      .then(({ data }) => {
        setLoading(false);
        // console.log(data?.payload[0]);
        setCompanies(data?.payload[0]);
        setFiltered(data?.payload[0]);
      })
      .catch(() => {
        setLoading(false);
        console.log("an error occured");
      });
  }, []);

  const handleDelete = (data: any) => {
    setDatas(data);
    setShowModalDelete(true);
  };
  const handleEdit = (data: any) => {
    setDatas2(data);
    setShowModalEdit(true);
  };
  const columns = [
    {
      Header: "S/N",
      accessor: "id",

      Cell: ({ cell: { row } }: any) => {
        let num = Number(row.id) + 1;
        return (
          <>
            <span className="lowercase">{num}</span>
          </>
        );
      },
    },
    {
      Header: "Name",
      accessor: "firstname",
      Cell: ({ cell: { row } }: any) => {
        return (
          <div className="flex items-center space-x-2">
            {/* <p className=" bg-blue-600  rounded-full">
              <i className="fa-solid fa-user p-3 text-white"></i>
            </p> */}
            <p className="font-bold w-[200px] capitalize">
              {row?.values.firstname?.split(" ")[0]}
            </p>
          </div>
        );
      },
    },
    {
      Header: "Enterprise",
      accessor: "company.name",
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ cell: { row } }: any) => (
        <>
          <span className="lowercase">{row?.values?.email}</span>
        </>
      ),
    },
    {
      Header: "Phone number",
      accessor: "phone",
    },
    {
      Header: "Limit visitors(daily)",
      // accessor: "phone",
      Cell: ({ cell: { row } }: any) => (
        <>
          <p className="text-sm text-white p-3 rounded bg-green-700">
            {row?.original?.limit}
          </p>
        </>
      ),
    },
    {
      Header: "Status",
      // accessor: "phone",
      Cell: ({ cell: { row } }: any) => (
        <>
          <button
            className={`${
              row?.original?.status === "unverified" && "bg-yellow-500"
            } ${row?.original?.status === "verified" && "bg-green-600"} ${
              row?.original?.status === "deactivated" && "bg-red-700"
            } p-2 w-24 rounded-lg mb-2`}
          >
            <p className="text-sm text-white">{row?.original?.status}</p>
          </button>
        </>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ cell: { row } }: any) => (
        <div className="flex justify-around items-center space-x-4 ">
          <button
            className="flex items-center space-x-2  bg-green-200 p-2 rounded-lg mb-2"
            onClick={() => handleEdit(row.original)}
          >
            <i className="fa-solid text-green-700 fa-pen"></i>
            <p className="text-xs text-green-700">Edit</p>
          </button>
          <button
            className="flex items-center space-x-2 bg-red-200 p-2 rounded-lg mb-2"
            onClick={() => handleDelete(row.values)}
          >
            <i className="fa-solid text-red-700 fa-trash"></i>
            <p className="text-xs text-red-700">Delete</p>
          </button>
        </div>
      ),
    },
  ];

  console.log(managers);

  useEffect(() => {
    const result = managers.filter((manager: any) =>
      manager?.name?.toLowerCase()?.match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  // changes made
  return (
    <div className="">
      <LoadingSpinner loading={loading} setLoading={setLoading} />

      <div className="flex justify-center lg:mt-0 mt-5">
        <div
          className={`bg-white  w-[80%]  md:w-[30%] shadow-header rounded-lg mb-4 mt-4 p-4 lg:mb-0 flex justify-start items-center`}
        >
          <div
            className={`h-10 w-10 p-2 flex justify-center items-center rounded-lg`}
          >
            <p className="text-[50px]">
              <i className="fa-solid fa-building text-red-700"></i>
            </p>
          </div>

          <div className="flex justify-center items-center flex-col ml-8">
            <span
              className={` text-black text-sm lg:text-xs pt-2 text-center `}
            >
              Registered managers
            </span>
            <p
              className={`text-black font-bold text-center pt-2 text-2xl lg:text-3xl`}
            >
              {managers.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <ManagerTable
          columns={columns}
          managers={filtered}
          search={search}
          setSearch={setSearch}
          showModal={showmodal}
          setShowModal={setShowModal}
        />
      </div>
      <ManagerModal
        loading={loading}
        setLoading={setLoading}
        showmodal={showmodal}
        setShowModal={setShowModal}
      />
      <DeleteModal
        title="Manager"
        writeup={`Are you sure you want to delete ${datas?.firstname}(Enterprise manager) from lekki free zone`}
        url={`${API_URL}/admin/manager/`}
        setShowModal={setShowModalDelete}
        showmodal={showmodaldelete}
        id={datas?.id}
      />
      <UserEdit
        title=""
        writeup={`Are you sure you want to delete ${datas2?.firstname}(Enterprise manager) from lekki free zone`}
        url={`${API_URL}/admin/manager/`}
        setShowModal={setShowModalEdit}
        showmodal={showmodaledit}
        id={datas2?.id}
        datas={datas2}
      />
    </div>
  );
}

export default RegisteredManagers;
