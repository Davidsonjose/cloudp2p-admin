import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
// import { NavLink, useLocation } from 'react-router-dom';
import { Transition } from "@headlessui/react";

function ItemMenu(props: any) {
  const [navHidden, setNavHidden] = useState("hidden");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [current, setCurrent] = useState("Dashboard");
  // const location = useLocation();

  function dropdown() {
    if (navHidden === "hidden") {
      setNavHidden("block");
      setIsActive(true);
    } else {
      setNavHidden("hidden");
      setIsActive(false);
    }
  }

  const { setIsSideBarVisible } = props;
  return (
    <>
      {props.data.variant === "regular" ? (
        <>
          <div>
            <div
              className={`p-2.5  flex items-center ${
                location.pathname === props.data.path ? "bg-[#011A3154]/30" : ""
              } rounded-md  duration-300 cursor-pointer  text-white`}
              onClick={() => {
                setIsSideBarVisible("hidden");
                setCurrent("");
                console.log(props.data.title, current);
                setCurrent(props.data.title);
              }}
            >
              <img src={props.data.icon} alt="" className="w-4 text-white" />
              <span className={`text-sm ml-4 font-semibold smooth text-black`}>
                {props.data.title}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="py-4 px-2 overflow-hidden smooth flex items-center rounded-md cursor-pointer  text-white"
            onClick={() => dropdown()}
          >
            <img src={props.data.icon} alt="" className="w-4" />
            <div className="flex justify-between w-full items-center ">
              <span className="text-sm ml-4 text-black font-semibold">
                {props.data.title}
              </span>
              {navHidden === "hidden" ? (
                <FiChevronRight color="black" />
              ) : (
                <FiChevronDown color="black" />
              )}
            </div>
          </div>

          <Transition
            show={isActive}
            enter="transition-all ease-in-out duration-1000"
            enterFrom="transform opacity-5 -translate-y-full"
            enterTo="transform -translate-y-0"
            leave="transition-all  ease-out duration-300"
            leaveFrom="transform -translate-y-0"
            leaveTo="transform -translate-x-full"
          >
            <div
              className={`text-left text-sm overflow-hidden   w-4/5 mx-auto text-[#94A6B6] font-semibold `}
              id="submenu"
            >
              {props.data.subMenu.map((item: any, i: number) => (
                <div key={i}>
                  <div
                    className={`${
                      location.pathname === item.path ? "bg-[#011A3154]/30" : ""
                    } p-2.5 flex items-center rounded-md  cursor-pointer  text-white`}
                    onClick={() => setIsSideBarVisible("hidden")}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="w-2 h-2 rounded-full"
                    />
                    <span
                      className={` text-sm ml-4  font-medium ${
                        item.color ? item.color : "text-[#004765]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Transition>
        </>
      )}
    </>
  );
}

export default ItemMenu;
