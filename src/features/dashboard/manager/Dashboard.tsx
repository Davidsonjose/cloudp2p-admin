import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { CHART_BG, ICON_1, ICON_2, ICON_3, ICON_4, TEAM } from "assets";
import AnalyticWidget from "components/widgets/AnalyticWidget";
import UserTable from "layouts/dashboardusertable";
import { useEffect, useState } from "react";
import { getAdminToken } from "common";
import axios from "axios";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
import { Fade } from "react-reveal";

const barData = [
  {
    name: "Jan",
    uv: 4000,

    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,

    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,

    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,

    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,

    amt: 2181,
  },
  {
    name: "Jun",
    uv: 3890,

    amt: 2181,
  },
];

function ManagerDashboard() {
  const token = getAdminToken();
  const [showmodal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [staffs, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const data = [
    {
      name: "Mon",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Tue",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Wed",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Thu",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Fri",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];
  const analyticData = [
    {
      label: "Active Visits",
      value: 20,
      icon: ICON_1,
      color: "bg-green-600",
    },
    {
      label: "Visits last 30 days",
      value: 33,
      icon: ICON_2,
      color: "bg-orange-600",
    },
    {
      label: "Total Annual Visits",
      value: 40,
      icon: ICON_3,
      color: "bg-blue-700",
    },
    {
      label: "Failed visits last 30 days",
      value: 20,
      icon: ICON_4,
      color: "bg-red-700",
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
      name: "Name",
      selector: (row: any) => (
        <div className='flex items-center space-x-2'>
          <p className='2xl bg-blue-600  rounded-full'>
            <i className='fa-solid fa-user p-3 text-white'></i>
          </p>
          <p className='font-bold w-[200px]'>{row.firstname.split(" ")[0]}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row: any) => row.phone,
    },
    {
      name: "Status",
      selector: (row: any) => (
        <p
          className={`p-1 text-white rounded-lg ${
            row.status === "verified" && "bg-green-500 "
          } ${row.status === "unverified" && "bg-yellow-500 "} ${
            row.status === "deactivated" && "bg-red-400"
          }`}
        >
          {row.status}
        </p>
      ),
    },
    {
      name: "Role",
      selector: (row: any) => <p>{row.role.toUpperCase()}</p>,
    },
    // {
    //   name: "Country Flag",
    //   selector: (row: any) => (
    //     <img width={50} height={50} src={row.flag} alt="logo" />
    //   ),
    // },
    {
      name: "Action",
      selector: (row: any) => (
        <div>
          <button className='flex items-center space-x-2 bg-green-200 p-2 rounded-lg mb-2 mt-2'>
            <i className='fa-solid text-green-700 fa-pen'></i>
            <p className='text-sm text-green-700'>Edit</p>
          </button>
          <button className='flex items-center space-x-2 bg-red-200 p-2 rounded-lg mb-2'>
            <i className='fa-solid text-red-700 fa-pen'></i>
            <p className='text-sm text-red-700'>Delete</p>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    // API_URL
    axiosCreate
      .get(`${API_URL}/staff`)
      .then(({ data }) => {
        setLoading(false);
        setStaff(data?.payload[0]);
        setFiltered(data?.payload[0]);
      })
      .catch(() => {
        setLoading(false);
        console.log("an error occured");
      });
  }, []);

  useEffect(() => {
    const result = staffs.filter((staff: any) =>
      staff?.name?.toLowerCase()?.match(search?.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  return (
    <div className='h-full  w-full px-6 lg:px-0 py-4 lg:py-0'>
      {loading ? (
        <LoadingSpinner loading={loading} setLoading={setLoading} />
      ) : (
        <>
          {/* widgets */}
          <div className='flex justify-between flex-wrap mb-8'>
            <Fade left>
              <div className=' w-full lg:w-[35%] mb-4 lg:mb-0 min-h-[300px] bg-[#111827] rounded-xl'>
                <div className='p-8 text-white'>
                  <h2 className=' text-3xl'>ICE</h2>
                  {/* <div className="flex justify-between items-center pt-4">
                    <div className="w-1/2">
                      <p className="">78%</p>
                      <span className="text-gray-500 text-xs">Income</span>
                    </div>
                    <div className="w-1/2">
                      <p className="">40%</p>
                      <span className="text-gray-500 text-xs ">Expenses</span>
                    </div>
                  </div> */}
                  <p className='text-sm text-black text-center lg:text-left lg:text-white dark:text-white font-medium pt-6'>
                    General statistic of information communication and emergency
                    processes in your company
                  </p>
                  <div className='pt-8'>
                    <div className='pt-8 text-2xl flex items-center space-x-3'>
                      <div className='w-10 h-10 rounded-full  bg-gray-500 flex items-center justify-center'>
                        <i className='text-white'>20</i>
                      </div>
                      <span className='text-base'>Company Information</span>
                    </div>
                    <div className='pt-8 text-2xl flex items-center space-x-3'>
                      <div className='w-10 h-10 rounded-full  bg-[#001F56] flex items-center justify-center'>
                        <i className='text-white'>20</i>
                      </div>
                      <span className='text-base'>Company Commuication</span>
                    </div>
                    <div className='pt-8 text-2xl flex items-center space-x-3'>
                      <div className='w-10 h-10 rounded-full  bg-[#F51F00] flex items-center justify-center'>
                        <i className='text-white'>20</i>
                      </div>
                      <span className='text-base'>Company Emergency</span>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div
                className={`${
                  tab === 0
                    ? "bg-gradient-to-bl from-current via-teal-700 to-orange-400"
                    : tab === 1
                    ? "bg-gradient-to-t from-current via-orange-700 to-rose-600"
                    : tab === 2
                    ? "bg-gradient-to-tr from-violet-600 via-cyan-400 to-purple-500"
                    : "bg-gradient-to-tr from-green-600 via-cyan-400 to-green-800"
                } min-h-[300px] w-full lg:w-[62%] rounded-xl`}
              >
                <div className='p-8'>
                  <div className='flex justify-between flex-wrap w-full mb-8'>
                    <a
                      className={`${
                        tab === 0
                          ? "font-bold text-base  text-orange-500"
                          : "text-base font-medium text-white cursor-pointer"
                      }`}
                      onClick={() => setTab(0)}
                    >
                      Activity
                    </a>
                    <a
                      className={`${
                        tab === 1
                          ? "font-bold text-base  text-orange-500"
                          : "text-base font-medium text-white cursor-pointer"
                      }`}
                      onClick={() => setTab(1)}
                    >
                      Emergency
                    </a>
                    <a
                      className={`${
                        tab === 2
                          ? "font-bold text-base  text-orange-500"
                          : "text-base font-medium text-white cursor-pointer"
                      }`}
                      onClick={() => setTab(2)}
                    >
                      Visits (weekly)
                    </a>
                    <a
                      className={`${
                        tab === 3
                          ? "font-bold text-base  text-orange-500"
                          : "text-base font-medium text-white cursor-pointer"
                      }`}
                      onClick={() => setTab(3)}
                    >
                      Visits (monthly)
                    </a>
                  </div>

                  <div>
                    {tab === 0 && (
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id='colorUv'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                              >
                                <stop
                                  offset='5%'
                                  stopColor='#FFFFFF'
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset='95%'
                                  stopColor='#FFFFFF'
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey='name' stroke='white' />
                            <YAxis stroke='white' />
                            {/* <CartesianGrid strokeDasharray="3 3"/> */}
                            <Tooltip />
                            <Area
                              type='monotone'
                              dataKey='uv'
                              stroke='#FFFFFF'
                              fillOpacity={1}
                              fill='url(#colorUv)'
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    {tab === 1 && (
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <BarChart
                            width={500}
                            height={300}
                            data={barData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <XAxis dataKey='name' stroke='white' />
                            <YAxis stroke='white' />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey='uv' fill='#d6ac2f' />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {tab === 2 && (
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id='colorUv'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                              >
                                <stop
                                  offset='5%'
                                  stopColor='#FFFFFF'
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset='95%'
                                  stopColor='#FFFFFF'
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey='name' stroke='white' />
                            <YAxis stroke='white' />
                            {/* <CartesianGrid strokeDasharray="3 3"/> */}
                            <Tooltip />
                            <Area
                              type='monotone'
                              dataKey='uv'
                              stroke='#FFFFFF'
                              fillOpacity={1}
                              fill='url(#colorUv)'
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    {tab === 3 && (
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <BarChart
                            width={500}
                            height={300}
                            data={barData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <XAxis dataKey='name' stroke='white' />
                            <YAxis stroke='white' />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey='uv' fill='#d6ac2f' />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <Fade bottom>
            <div className='flex justify-around md:justify-between flex-wrap  mt-4 lg:mt-0 lg:bg-rectangle py-8 pl-8 pr-4 rounded-xl'>
              <div className='w-full lg:w-40 pt-6 mb-4 lg:mb-0'>
                <p className='font-bold text-black lg:text-white dark:text-white text-xl '>
                  Engagement
                </p>
                <p className='text-sm text-black text-center lg:text-left lg:text-white dark:text-white font-medium pt-6'>
                  General statistic of visitors engagement processes in your
                  company
                </p>
              </div>

              {analyticData.map((item, i) => (
                <AnalyticWidget
                  textvalueColor={"text-gray-700"}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  iconBackground={item.color}
                  labelColor='text-black'
                  containerBackgroundColor={"bg-white"}
                />
              ))}
            </div>
          </Fade>

          {/* <div className='mt-16'>
						<UserTable
							columns={columns}
							countries={filtered}
							search={search}
							setSearch={setSearch}
							showModal={showmodal}
							setShowModal={setShowModal}
						/>
					</div> */}
        </>
      )}
    </div>
  );
}

export default ManagerDashboard;
