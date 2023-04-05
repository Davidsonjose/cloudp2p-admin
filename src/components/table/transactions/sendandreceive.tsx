// import AuthWrapper from 'components/wrappers/auth-wrapper';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import DataTable from "react-data-table-component";
import { SORT, Search } from "@/assets";
import Image from "next/image";
import { Fade } from "react-reveal";
import SendPopup from "@/features/dashboard/transaction/popupsendandreceive";
interface mainLayoutTypes {
  children: JSX.Element;
}

function SendAndReceive(props: any) {
  const { show2, setShow2, data, setData } = props;
  const [show, setShow] = useState(false);

  const handleSort = () => {
    setShow(!show);
  };
  const handleOverlay = () => {
    if (show) {
      setShow(false);
    }
  };
  return (
    <div className="" onClick={() => handleOverlay()}>
      <div className="mt-10 lg:flex lg:mx-0 mx-4 justify-between items-center mb-5">
        <div>
          <h3 className="font-bold text-lg">Transactions</h3>
        </div>
        <div className="lg:mt-0 mt-4 relative flex justify-between space-x-5">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <Image src={Search} alt="search" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block py-2 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button
            className="justify-center flex items-center space-x-3 bg-[#17193F0D] py-2 px-5 text-sm rounded-lg"
            onClick={() => handleSort()}
          >
            {/* <i className="fa-solid fa-flask"></i> */}
            <Image src={SORT} alt="sort" />
            <p className="text-[16px]">Sort</p>
          </button>
          {show && (
            <Fade>
              <div className="bg-[#FFFFFF] w-[130px] absolute left-[50%] top-[100%] z-[50] rounded-lg">
                <div className="">
                  <p className=" px-3 pt-2 pb-2 text-[10px] font-semibold text-[#141414]">
                    Sort By
                  </p>
                  <div className="border-b border-gray-100"></div>
                  <p className="cursor-pointer px-3 pt-2 pb-2 text-[10px] text-[#141414]">
                    Send Transactions
                  </p>
                  <p className="cursor-pointer px-3 pt-2 pb-2 text-[10px] text-[#141414]">
                    Receive Transactions
                  </p>
                  <p className="cursor-pointer px-3 pt-2 pb-2 text-[10px] text-[#141414]">
                    Status
                  </p>
                  <p className="cursor-pointer px-3 pt-2 text-[10px] text-[#141414] pb-5">
                    Date
                  </p>
                </div>
              </div>
            </Fade>
          )}
        </div>
      </div>

      <div className="relative">
        <SendPopup
          show={show2}
          setShow={setShow2}
          datas={data}
          setDatas={setData}
        />
      </div>
      <DataTable
        columns={props.columns}
        data={props.userdetails}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover

        // subHeader
        // subHeaderComponent={
        //   <div className="mt-4 flex justify-between items-center">
        //     <div>
        //       <h3 className="font-bold text-lg">Company Details</h3>
        //     </div>
        //     <div>
        //       <input
        //         type="text"
        //         placeholder="Search here"
        //         className="w-50 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 p-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //       />
        //       <button className="text-white text-sm ml-4 bg-[#0C198B] p-2 rounded-full">
        //         Add New Company
        //       </button>
        //     </div>
        //   </div>
        // }
      />
      {show && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
      {show2 && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </div>
  );
}

export default SendAndReceive;
