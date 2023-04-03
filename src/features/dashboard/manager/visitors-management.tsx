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
import { getAdminToken, getManagerToken, getUser } from "common";
import axios from "axios";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
import VisitorsWidget from "components/widgets/VisitorsWidget";
import VisitorTable from "layouts/visitorstable";
import VisitorsModal from "layouts/visitors/visitorsmodal";
import { useNavigate } from "react-router-dom";
import UpdateCode from "layouts/updatecode";
import RedeemCode from "layouts/redeemcode";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "features/auth/api/slice";
function VisitorsManagementManager() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = getManagerToken();
  // const token = getAdminToken();
  const [showmodal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any>([]);
  const [visitors, setVisitors] = useState<any>([]);
  // const [showmodal, setShowModal] = useState("")
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<any>([]);
  const [datas, setDatas] = useState<any>(null);
  const [open2, setOpen2] = useState(false);
  const [datas2, setDatas2] = useState<any>(null);
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

  const handleUpdate = (data: any) => {
    setDatas(data);
    setOpen(true);
  };
  const handleUpdate2 = (data: any) => {
    setDatas2(data);
    setOpen2(true);
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
      Header: "Enterprise",
      accessor: "company",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p className="w-[130px]">
              {row?.original?.company?.name
                ? row?.original?.company?.name
                : "Deactivated"}
            </p>
          </>
        );
      },
    },

    {
      Header: "Name",
      accessor: "name",
    },
    // {
    //   Header: "Plate no",
    //   accessor: "PlateNumber",
    //   Cell: ({ cell: { row } }: any) => {
    //     return (
    //       <>
    //         <p>{row.original.PlateNumber ? row.values.PlateNumber : "N/A"}</p>
    //       </>
    //     );
    //   },
    // },
    {
      Header: "Entry date",
      accessor: "EntryDate",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p className="w-[200px]">
              {row.original.entrytime
                ? moment(row.original.entrytime).format("ll")
                : "-- & --"}
            </p>
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
            <p className="w-[139px]">
              {row.original.entrytime
                ? moment(row.original.entrytime).format("LT")
                : "-- & --"}
            </p>
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
            <p className="w-[139px]">
              {row.original.exitTime
                ? moment(row.original.exitTime).format("LT")
                : "-- & --"}
            </p>
          </>
        );
      },
    },
    {
      Header: "Duration",
      accessor: "duration",
      Cell: ({ cell: { row } }: any) => {
        const calc = (entry: any, exit: any) => {
          var today = new Date();
          // var Christmas = new Date(today.getFullYear() + "-12-25");
          var diffMs = entry - exit; // milliseconds between now & Christmas
          console.log(diffMs, "milsecs", entry, exit);
          var Christmas = new Date(today.getFullYear() + "-12-25");
          console.log(Christmas);
          var diffDays = Math.floor(diffMs / 86400000); // days
          var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
          var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
          console.log(
            diffDays +
              " days, " +
              diffHrs +
              " hours, " +
              diffMins +
              " minutes until Christmas =)"
          );
          const main = Math.abs(entry - exit) / 36e5;
          console.log(main, "main", entry, "entry ");
          // return (
          //   diffDays +
          //   " days, " +
          //   diffHrs +
          //   " hours, " +
          //   diffMins +
          //   " minutes until Christmas =)"
          // );
        };
        return (
          <>
            <p>
              {row.original.exitTime ? (
                <>{calc(row?.original?.entrytime, row?.original?.exitTime)}</>
              ) : (
                ""
              )}
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
            {row?.original.status === "inactive" && (
              <button
                disabled={true}
                className="bg-[#f1b716] w-20 text-white p-2 rounded-md"
              >
                {row.original.status}
              </button>
            )}
            {row?.original.status === "active" && (
              <button
                disabled={true}
                className="bg-[#25C235] w-20 text-white p-2 rounded-md"
              >
                {row.original.status}
              </button>
            )}
            {row?.original.status === "expired" && (
              <button
                disabled={true}
                className="bg-[#df1313] w-20 text-white p-2 rounded-md"
              >
                {row.original.status}
              </button>
            )}
            {row?.original.status === "cancelled" && (
              <button
                disabled={true}
                className="bg-[#df1313] w-20 text-white p-2 rounded-md"
              >
                {row.original.status}
              </button>
            )}
            {row?.original.status === "completed" && (
              <button
                disabled={true}
                className="bg-green-900 w-20 text-white p-2 rounded-md"
              >
                {row.original.status}
              </button>
            )}
          </div>
        );
      },
    },

    {
      Header: "Action",
      accessor: "",
      Cell: ({ cell: { row } }: any) => {
        return (
          <div className="flex space-x-3">
            {row?.original?.status === "cancelled" && (
              <button
                className="flex items-center space-x-2 bg-gray-200 p-2 w-24 rounded-lg mb-2"
                // onClick={() => handleUpdate(row?.values)}
                disabled={true}
              >
                <i className="fa-solid fa-pen"></i>
                <p className="text-sm">cancelled</p>
              </button>
            )}
            {/* {row?.original?.status === "completed" && (
              <button
                className="flex items-center space-x-2 bg-green-500 p-2 w-24 rounded-lg mb-2"
                // onClick={() => handleUpdate(row?.values)}
              >
                <p className="text-sm text-white text-center">
                  {row?.original?.status}
                </p>
              </button>
            )} */}
            {row?.original?.status !== "cancelled" &&
            row?.original?.status !== "completed" ? (
              <button
                className="flex items-center space-x-2 bg-red-500 p-2 w-24 rounded-lg mb-2"
                onClick={() => handleUpdate(row?.values)}
              >
                <i className="fa-solid text-white fa-pen"></i>
                <p className="text-sm text-white">cancel</p>
              </button>
            ) : null}
            {row?.original?.status === "expired" ? (
              <button
                className="flex items-center space-x-2 bg-green-500 p-2 w-24 rounded-lg mb-2"
                onClick={() => handleUpdate2(row?.values)}
                // disabled={true}
              >
                <i className="fa-solid fa-pen text-white"></i>
                <p className="text-sm text-white">Redeem</p>
              </button>
            ) : (
              <button
                className="flex items-center space-x-2 bg-gray-400 p-2 w-24 rounded-lg mb-2"
                // onClick={() => handleUpdate2(row?.values)}
                disabled={true}
              >
                <i className="fa-solid fa-pen text-white"></i>
                <p className="text-sm text-white">Redeem</p>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const columns2 = [
    {
      Header: "S/N",
      accessor: "id",

      Cell: ({ cell: { row } }: any) => {
        let num = Number(row.id) + 1;
        // console.log(row?.values, "here is row")

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
            <p>{row?.original?.name}</p>
          </>
        );
      },
    },
    {
      Header: "Total visitors",
      accessor: "totalvisitors",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row?.original?.totalvisitors}</p>
          </>
        );
      },
    },
    {
      Header: "Total codes issued",
      accessor: "totaltoken",
      Cell: ({ cell: { row } }: any) => {
        return (
          <>
            <p>{row?.original?.totaltoken}</p>
          </>
        );
      },
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ cell: { row } }: any) => {
        return (
          <div>
            <button
              className="flex items-center space-x-2 bg-blue-500 p-2 w-24 rounded-lg mb-2"
              onClick={() =>
                navigate("/dashboard/admin/company-records", {
                  state: { id: row?.original?.id, record: row.original },
                })
              }
            >
              <i className="fa-solid text-white fa-pen"></i>
              <p className="text-sm text-white">View</p>
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    // API_URL
    axiosCreate
      .get(`${API_URL}/company/single/${user?.company?.id}`)
      .then(({ data }) => {
        setLoading(false);
        setVisitors(data?.payload);
        setFiltered(data?.payload);
      })
      .catch(() => {
        setLoading(false);
        console.log("an error occured");
      });
    axiosCreate
      .get(`${API_URL}/code/company/${user?.company?._id}`)
      .then(({ data }) => {
        setLoading(false);
        setCode(data?.payload[0]);
      })
      .catch(() => {
        setLoading(false);
        console.log("an error occured");
      });
  }, []);

  useEffect(() => {
    const result = visitors.filter((visitor: any) =>
      visitor?.name?.toLowerCase()?.match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  console.log(user);
  return (
    <div className="h-full w-full px-6 lg:px-0">
      {loading ? (
        <LoadingSpinner loading={loading} setLoading={setLoading} />
      ) : (
        <>
          {/* widgets */}
          <VisitorsWidget data={visitors} />
          {/* graph */}

          <div className="mt-16">
            <VisitorTable
              columns={columns}
              visitors={filtered}
              search={search}
              setSearch={setSearch}
              showModal={showmodal}
              setShowModal={setShowModal}
              columns2={columns2}
              code={code}
            />
          </div>
        </>
      )}
      <VisitorsModal showmodal={showmodal} setShowModal={setShowModal} />
      <UpdateCode
        open={open}
        setOpen={setOpen}
        url={`${API_URL}/code/update`}
        id={datas?.id}
        status={"cancelled"}
      />
      <RedeemCode
        open={open2}
        setOpen={setOpen2}
        url={`${API_URL}/code/redeem`}
        id={datas2?.id}
        status={"active"}
      />
    </div>
  );
}

export default VisitorsManagementManager;
