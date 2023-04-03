import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ICON_1, ICON_2, ICON_3, ICON_4, TEAM } from "assets";
import AnalyticWidget from "components/widgets/AnalyticWidget";
import UserTable from "layouts/dashboardusertable";
import { useEffect, useState } from "react";
import { getAdminToken } from "common";
import axios from "axios";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
import VisitorsWidget from "components/widgets/VisitorsWidget";
import VisitorTable from "layouts/visitorstable";
import VisitorsModal from "layouts/visitors/visitorsmodal";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyRecordTable from "layouts/companyrecords";
function CompanyRecords() {
  const location = useLocation();
  const { id, record } = location?.state;
  const navigate = useNavigate();
  const token = getAdminToken();
  const [showmodal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any>([]);
  const [visitors, setVisitors] = useState<any>([]);
  // const [showmodal, setShowModal] = useState("")
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<any>([]);
  const data = [
    {
      name: "Jan",
      uv: 1000,
    },
    {
      name: "Feb",
      uv: 100,
    },
    {
      name: "Mar",
      uv: 200,
    },
    {
      name: "April",
      uv: 280,
    },
    {
      name: "May",
      uv: 190,
    },
  ];
  const analyticData = [
    {
      label: "Active Visits",
      value: 20,
      icon: ICON_1,
    },
    {
      label: "Visits last 30 days",
      value: 33,
      icon: ICON_2,
    },
    {
      label: "Total annual visits",
      value: 40,
      icon: ICON_3,
    },
    {
      label: "Expired visit last 30 days",
      value: 20,
      icon: ICON_4,
    },
  ];

  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });

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
      Header: "Enterprise",
      accessor: "company",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row.original.company.name}</p>
          </>
        );
      },
    },

    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Code",
      accessor: "originalcode",
    },

    {
      Header: "Entry date",
      accessor: "EntryDate",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row.original.entrytime ? row.original.entrytime : "-- & --"}</p>
          </>
        );
      },
    },
    {
      Header: "Entry time",
      accessor: "",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row.original.entrytime ? row.original.entrytime : "-- & --"}</p>
          </>
        );
      },
    },
    {
      Header: "Exit time",
      accessor: "ExitTime",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row.original.exitTime ? row.original.exitTime : "-- & --"}</p>
          </>
        );
      },
    },
    {
      Header: "Duration {Hrs}",
      accessor: "duration",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>
              {row.original.entrytime && row.original.exitTime
                ? row.original.entrytime
                : "-- & --"}
            </p>
          </>
        );
      },
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ cell: { row } }: any) => {
        return (
          <div>
            <div>
              {row?.original.status === "pending" && (
                <button className="bg-[#f1b716] text-white p-2 rounded-md">
                  {row.original.status}
                </button>
              )}
              {row?.original.status === "active" && (
                <button className="bg-[#25C235] text-white p-2 rounded-md">
                  {row.original.status}
                </button>
              )}
              {row?.original.status === "expired" && (
                <button className="bg-[#df1313] text-white p-2 rounded-md">
                  {row.original.status}
                </button>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  //   const columns2 = [
  //     {
  //       Header: "S no.",
  //       accessor: "id",

  //       Cell: ({ cell: { row } }: any) => {
  //         let num = Number(row.id) + 1;
  //         // console.log(row?.values, "here is row")

  //         return (
  //           <>
  //             <span className="lowercase">{num}</span>
  //           </>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Company",
  //       accessor: "company",
  //       Cell: ({ cell: { row } }: any) => {
  //         console.log(row, "here is rowsman");
  //         return (
  //           <>
  //             <p>{row.original.name}</p>
  //           </>
  //         );
  //       },
  //     },
  //     {
  //       Header: "total visitors",
  //       accessor: "totalvisitors",
  //       Cell: ({ cell: { row } }: any) => {
  //         return (
  //           <>
  //             <p>{row.original.totalvisitors}</p>
  //           </>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Total code issued",
  //       accessor: "totaltoken",
  //       Cell: ({ cell: { row } }: any) => {
  //         return (
  //           <>
  //             <p>{row.original.totaltoken}</p>
  //           </>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Action",
  //       accessor: "",
  //       Cell: ({ cell: { row } }: any) => {
  //         return (
  //           <div>
  //             <button
  //               className="flex items-center space-x-2 bg-blue-500 p-2 w-24 rounded-lg mb-2"
  //               onClick={() =>
  //                 navigate("/dashboard/admin/company-records", {
  //                   state: { id: row?.original?.id },
  //                 })
  //               }
  //             >
  //               <i className="fa-solid text-white fa-pen"></i>
  //               <p className="text-sm text-white">View</p>
  //             </button>
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  //   console.log(id)
  useEffect(() => {
    setLoading(true);
    // API_URL
    axiosCreate
      .get(`${API_URL}/code/company/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setVisitors(data?.payload[0]);
        setFiltered(data?.payload[0]);
        console.log(data?.payload);
      })
      .catch(() => {
        setLoading(false);
        console.log("an error occured");
      });
    // axiosCreate
    //   .get(`${API_URL}/code`)
    //   .then(({ data }) => {
    //     setLoading(false);
    //     setCode(data?.payload[0]);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     console.log("an error occured");
    //   });
  }, [id]);

  return (
    <div className="h-full w-full px-6 lg:px-0">
      <button
        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      {loading ? (
        <LoadingSpinner loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <div className="mt-16">
            <div>
              <h3 className="font-bold text-lg text-white text-center">
                {record?.name}
              </h3>
            </div>
            <CompanyRecordTable
              columns={columns}
              visitors={filtered}
              search={search}
              setSearch={setSearch}
              showModal={showmodal}
              setShowModal={setShowModal}
              //   columns2={columns2}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CompanyRecords;
