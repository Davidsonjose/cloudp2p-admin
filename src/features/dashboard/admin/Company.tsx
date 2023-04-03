import React, { useState, useEffect } from "react";
import CompanyTable from "layouts/companytable";
import axios from "axios";
import API_URL from "config";
import { getAdminToken } from "common";
import CompanyModal from "layouts/company/companymodal";
import LoadingSpinner from "layouts/loadingSpinner";
import { Fade } from "react-reveal";
import DeleteModal from "layouts/deletemodal";

function Company() {
  const token = getAdminToken();
  const [showmodal, setShowModal] = useState(false);
  const [showmodaldelete, setShowModalDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<any>(null);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });
  useEffect(() => {
    setLoading(true);
    axiosCreate
      .get(`${API_URL}/company`)
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

  const columns = [
    {
      Header: "S/N",
      accessor: "id",

      Cell: ({ cell: { row } }: any) => {
        let num = Number(row.id) + 1;
        return (
          <>
            <span className='lowercase'>{num}</span>
          </>
        );
      },
    },
    {
      Header: "Enterprise",
      accessor: "name",
    },

    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ cell: { row } }: any) => {
        return (
          <div>
            {/* <button className="flex items-center space-x-2 bg-green-200 p-2 rounded-lg w-24 mb-2 mt-2">
    <i className="fa-solid text-green-700 fa-pen"></i>
    <p className="text-sm text-green-700">Edit</p>
  </button> */}
            <button
              className='flex items-center space-x-2 bg-red-200 p-2 w-24 rounded-lg mb-2'
              onClick={() => handleDelete(row?.values)}
            >
              <i className='fa-solid text-red-700 fa-pen'></i>
              <p className='text-sm text-red-700'>Delete</p>
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const result = companies.filter((country: any) =>
      country?.name.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  return (
    <div className=''>
      {loading ? (
        <LoadingSpinner loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <Fade top>
            <div className='flex justify-center lg:mt-0 mt-5'>
              <div
                className={`bg-white  w-[80%]  md:w-[30%] shadow-header rounded-lg mb-4 mt-4 p-4 lg:mb-0 flex justify-start items-center`}
              >
                <div
                  className={`h-10 w-10 p-2 flex justify-center items-center rounded-lg`}
                >
                  <p className='text-[50px]'>
                    <i className='fa-solid fa-building text-orange-700'></i>
                  </p>
                </div>

                <div className='flex justify-center items-center flex-col ml-8'>
                  <span
                    className={` text-black text-sm lg:text-xs pt-2 text-center `}
                  >
                    Registered enterprises
                  </span>
                  <p
                    className={`text-black font-bold text-center pt-2 text-2xl lg:text-3xl`}
                  >
                    {companies?.length}
                  </p>
                </div>
              </div>
            </div>
          </Fade>
          <div className='mt-16'>
            <CompanyTable
              columns={columns}
              countries={filtered}
              search={search}
              setSearch={setSearch}
              showModal={showmodal}
              setShowModal={setShowModal}
            />
          </div>
          <DeleteModal
            title='enterprise'
            writeup={`Are you sure you want to delete ${datas?.name} (enterprise) from lekki free zone`}
            setShowModal={setShowModalDelete}
            showmodal={showmodaldelete}
            url={`${API_URL}/company/`}
            id={datas?.id}
          />
          <CompanyModal showmodal={showmodal} setShowModal={setShowModal} />
        </>
      )}
    </div>
  );
}

export default Company;
