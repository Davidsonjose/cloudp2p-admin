import { Menu, Transition } from "@headlessui/react";
import { Avater, Avatars } from "@/assets";
import { removeAdminSession } from "@/common";
import { reset, selectUser } from "@/features/auth/api/slice";
import { useAppSelector } from "@/hooks";
import { Fragment } from "react";
import { FaChevronDown, FaStreetView } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

interface dropdownTypes {
  view: boolean;
  setView: any;
}
export function Dropdown(props: dropdownTypes) {
  const currentUser = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const logout = () => {
    removeAdminSession();
    dispatch(reset());
    router.push("/");
    // navigate("/");
  };

  const toggleView = () => {
    if (props.view) {
      props.setView(false);
    }
  };
  return (
    <div className=" max-w-56 text-right" onClick={() => toggleView()}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Image src={Avatars} alt="" className="rounded-full w-8 h-8" />
            <FaChevronDown
              className="ml-2 mr-1 h-5 w-5 hover:text-[#F59E0B] text-black"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {}}
                    className={`${
                      active ? "bg-BRAND text-blue-800" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FcHome className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FcHome className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Go to home
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logout()}
                    className={`${
                      active ? "bg-BRAND text-blue-800" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <HiOutlineLogout
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineLogout
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
