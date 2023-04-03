import { LOGO, COMPANY_LOGO, OVERVIEW } from "@/assets";
import ItemMenu from "./item-menu";
import { AiOutlineClose } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "@/hooks";
import { selectUser } from "@/features/auth/api/slice";
import { getAdmin } from "@/common";
import Image from "next/image";

function Sidebar(props: any) {
  // const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 640px)");
  const isTabletView = useMediaQuery("(max-width: 840px)");
  const user = useSelector(selectUser);
  const users = useSelector(getAdmin);
  console.log(users, "here is users");
  const { setIsSideBarVisible } = props;
  return (
    <div className="scrollbar-hide z-50">
      {isMobileView || isTabletView ? (
        <Transition
          className={"z-50"}
          show={props?.open}
          enter="transition-all ease-in-out duration-1000"
          enterFrom="transform -translate-y-full"
          enterTo="transform -translate-y-0"
          leave="transition-all  ease-out duration-300"
          leaveFrom="transform -translate-y-0"
          leaveTo="transform -translate-x-full"
        >
          <div
            className={`${props?.isSideBarVisible} lg:block overflow-hidden h-screen scrollbar-hide `}
          >
            <div
              className={`sidebar z-50 fixed w-[300px] top-0 bottom-0 lg:left-0 p-2 lg:w-[20%] h-full overflow-y-auto text-center bg-white`}
            >
              <div className="h-full flex justify-between flex-col ">
                <div className="mb-8">
                  <div className="text-gray-100 text-xl sticky top-0 z-50 bg-white  dark:text-white">
                    <div className="relative">
                      <div className="flex items-center justify-center py-6">
                        <Image
                          src={LOGO}
                          alt=""
                          height={32}
                          width={32}
                          className="w-32 h-32 self-center rounded-full cursor-pointer "
                        />
                        <div className="w-32 h-32 self-center rounded-full shadow-logo absolute animate-spin"></div>
                      </div>
                    </div>

                    <div className="shadow-header  absolute top-3 right-2  block lg:hidden rounded-full p-2 bg-black cursor-pointer">
                      <AiOutlineClose
                        color="#ffffff"
                        className=""
                        onClick={props.openSidebar}
                      />
                    </div>
                  </div>
                  <div className="pt-12">
                    {props.data.map((item: any, i: number) => (
                      <ItemMenu
                        data={item}
                        key={i}
                        setIsSideBarVisible={setIsSideBarVisible}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      ) : (
        <div
          className={`${props.isSideBarVisible} z-50 lg:block overflow-hidden h-screen scrollbar-hide`}
        >
          <div
            className={`sidebar  z-50  fixed top-0 bottom-0 lg:left-0 p-2 lg:w-[20%] h-full overflow-y-scroll text-center bg-[#17193F] scrollbar-hide`}
          >
            <div className="h-full flex justify-between flex-col ">
              <div className="mb-8  ">
                {/* <div className="text-gray-100 text-xl sticky top-0 z-50 bg-white ">
                  <div className="relative">
                    <div className="flex items-center justify-center py-6">
                      <Image
                        src={LOGO}
                        alt=""
                        // height={32}
                        // width={32}
                        className="w-32 h-32 self-center rounded-full cursor-pointer "
                      />
                      <div className="w-32 h-32 self-center rounded-full shadow-logo absolute animate-spin"></div>
                    </div>
                  </div>
                  {user && (
                    <span className="text-gray-600 capitalize text-base font-bold">
                      {user?.role === "admin"
                        ? user.role
                        : "Enterprise Manager"}
                      <br />
                      {user?.role === "manager" && `${user?.company?.name}`}
                    </span>
                  )}

                  <div className="shadow-header  absolute top-3 right-2  block lg:hidden rounded-full p-2 bg-black cursor-pointer">
                    <AiOutlineClose
                      color="#ffffff"
                      className=""
                      onClick={props.openSidebar}
                    />
                  </div>
                </div> */}
                <div className="flex space-x-4 mt-5 justify-center items-center">
                  <Image
                    src={COMPANY_LOGO}
                    alt=""
                    // height={32}
                    // width={32}
                    className="h-20 w-12 self-center rounded-full cursor-pointer "
                  />
                  <h4 className="text-white text-[18px] font-semibold">
                    CloudP2P
                  </h4>
                </div>
                <div className="bg-[#E9EAFF] mt-10 flex items-center px-14 space-x-4">
                  <Image
                    src={OVERVIEW}
                    alt=""
                    // height={32}
                    // width={32}
                    className="h-5 w-5 self-center rounded-full cursor-pointer "
                  />
                  <span className="py-4 text-center">Overview</span>
                </div>
                <div className="px-4 pt-12">
                  {props.data.map((item: any, i: number) => (
                    <ItemMenu
                      data={item}
                      key={i}
                      setIsSideBarVisible={setIsSideBarVisible}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
