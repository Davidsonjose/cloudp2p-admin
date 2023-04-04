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
} from "recharts";
function AnalyticGraph() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
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
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
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
        <div className="flex space-x-5 justify-between">
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
                width={500}
                height={400}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0,}}
              >
                <CartesianGrid vertical={false} strokeWidth={0.2} />
                <XAxis axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#FF0000"
                  fill="#fff"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h4 className="">Total Payments</h4>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>This week</option>
                  <option value="US">last month</option>
                  <option value="CA">last year</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyticGraph;
