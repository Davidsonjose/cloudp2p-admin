import React from "react";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
function AnalyticGraph() {
  const data = [
    {
      name: "Page A",
      uv: 200,
      pv: 100,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 1000,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 1200,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 1400,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 1300,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 2490,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 1200,
      amt: 1200,
    },
    {
      name: "Page B",
      uv: 2000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 1780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="flex space-x-5 pb-7 justify-between">
          <div className="bg-white rounded-lg w-full">
            <div className="flex items-center justify-between m-5">
              <h4 className="">Total Payments</h4>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>This week</option>
                  <option value="US">last month</option>
                  <option value="CA">last year</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%" aspect={3}>
              <AreaChart
                width={700}
                height={600}
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#FF3D00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeWidth={0.2} />
                {/* <XAxis axisLine={false} tickLine={false} /> */}
                <YAxis tickCount={8} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#FF0000"
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#FF3D0033"
                  fill="#fff"
                />
                {/* <Line
                  type="monotone"
                  data={data2}
                  dataKey="uv"
                  stroke="#FF0000"
                /> */}
                {/* <Area
                  type="monotone"
                  data={data2}
                //   dataKey="uv"
                //   stroke="#FF0000"
                //   fill="url(#colorUv)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg w-full">
            <div className="flex items-center justify-between m-5">
              <h4 className="">Active Users</h4>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>This week</option>
                  <option value="US">last month</option>
                  <option value="CA">last year</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%" aspect={3}>
              <AreaChart
                width={700}
                height={600}
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#00FF00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00FF009" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeWidth={0.2} />
                {/* <XAxis axisLine={false} tickLine={false} /> */}
                <YAxis tickCount={8} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#00FF00"
                  fill="url(#colorUh)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#00FF00"
                  fill="#fff"
                />
                {/* <Line
                  type="monotone"
                  data={data2}
                  dataKey="uv"
                  stroke="#FF0000"
                /> */}
                {/* <Area
                  type="monotone"
                  data={data2}
                //   dataKey="uv"
                //   stroke="#FF0000"
                //   fill="url(#colorUv)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex space-x-5 mb-4 justify-between">
        <div className="bg-white rounded-lg w-full">
            <div className="flex items-center justify-between m-5">
              <h4 className="">Registered Users</h4>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>This week</option>
                  <option value="US">last month</option>
                  <option value="CA">last year</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%" aspect={3}>
              <AreaChart
                width={700}
                height={600}
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUhy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#0C46D3" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0C46D3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeWidth={0.2} />
                {/* <XAxis axisLine={false} tickLine={false} /> */}
                <YAxis tickCount={8} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#0C46D3"
                  fill="url(#colorUhy)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#0C46D3"
                  fill="#fff"
                />
                {/* <Line
                  type="monotone"
                  data={data2}
                  dataKey="uv"
                  stroke="#FF0000"
                /> */}
                {/* <Area
                  type="monotone"
                  data={data2}
                //   dataKey="uv"
                //   stroke="#FF0000"
                //   fill="url(#colorUv)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg w-full">
            <div className="flex items-center justify-between m-5">
              <h4 className="">Logged in</h4>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>This week</option>
                  <option value="US">last month</option>
                  <option value="CA">last year</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%" aspect={3}>
              <AreaChart
                width={700}
                height={600}
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUhk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#FFA500" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeWidth={0.2} />
                {/* <XAxis axisLine={false} tickLine={false} /> */}
                <YAxis tickCount={8} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#FFA500"
                  fill="url(#colorUhk)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#FFA500"
                  fill="#fff"
                />
                {/* <Line
                  type="monotone"
                  data={data2}
                  dataKey="uv"
                  stroke="#FF0000"
                /> */}
                {/* <Area
                  type="monotone"
                  data={data2}
                //   dataKey="uv"
                //   stroke="#FF0000"
                //   fill="url(#colorUv)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyticGraph;
