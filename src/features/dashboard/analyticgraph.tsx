import React from "react";

function AnalyticGraph() {
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
