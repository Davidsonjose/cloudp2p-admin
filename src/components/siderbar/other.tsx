{
  /* <div className="scrollbar-hide z-50">
  {isMobileView || isTabletView ? (
    <Transition
      className={"z-50"}
      show={props?.open}
      enter="transition-all ease-in-out duration-7000"
      enterFrom="transform -translate-x-full"
      enterTo="transform -translate-x-0"
      leave="transition-all  ease-out duration-500"
      leaveFrom="transform -translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <div
        className={`${props?.isSideBarVisible} lg:block overflow-hidden h-screen scrollbar-hide `}
      >
        <div
          className={`sidebar  z-50  fixed top-0 bottom-0 lg:left-0  lg:w-[18.5%] w-[400px] h-full overflow-y-scroll text-center bg-[#17193F] scrollbar-hide`}
        >
          <div className="h-full flex justify-between flex-col ">
            <div className="mb-8  ">
              <div className="flex justify-between items-center mx-4">
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
                <div>
                  <AiOutlineClose
                    color=""
                    className="bg-white h-10 w-10 rounded-lg"
                    onClick={props.openSidebar}
                  />
                </div>
              </div>
              <div
                className={`${
                  active === "home" ? "bg-[#E9EAFF] " : ""
                } mt-10 flex items-center px-14 space-x-4 cursor-pointer`}
                onClick={() => navigate.push("/dashboard/admin")}
              >
                <Image
                  src={OVERVIEW}
                  alt=""
                  // height={32}
                  // width={32}
                  className="h-5 w-5 self-center rounded-full cursor-pointer "
                />
                <span
                  className={`py-4 text-center ${
                    active === "" && "text-white"
                  }`}
                >
                  Overview
                </span>
              </div>
              {props.data.map((dats: any) => (
                <>
                  <div>
                    <p className="text-[#FFFFFF99] pb-6 font-semibold text-[10px] pt-5 flex mx-12">
                      {dats?.category}
                    </p>
                  </div>
                  {dats?.sub.map((dats: any, i: any) => (
                    <div
                      key={i}
                      onClick={() => {
                        // setActive("");
                        if (dats.title === "Add User") {
                          setOpen(true);
                          setIsSideBarVisible("hidden");
                        } else {
                          navigate.push(`${dats.path}`);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className="flex mx-14 pb-6 items-center space-x-4"
                        // key={i}
                      >
                        <Image
                          src={dats?.icon}
                          alt=""
                          // height={32}
                          // width={32}
                          className="h-[10.06px] w-[11.37px] self-center rounded-full cursor-pointer "
                        />
                        <h3 className="text-white text-[14px]">
                          {dats?.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </>
              ))}
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
        className={`sidebar  z-50  fixed top-0 bottom-0 lg:left-0  lg:w-[18.5%] h-full overflow-y-scroll text-center bg-[#17193F] scrollbar-hide`}
      >
        <div className="h-full flex justify-between flex-col ">
          <div className="mb-8  ">
            <div className="flex space-x-4 mt-5 justify-center items-center">
              <Image
                src={COMPANY_LOGO}
                alt=""
                // height={32}
                // width={32}
                className="h-20 w-12 self-center rounded-full cursor-pointer "
              />
              <h4 className="text-white text-[18px] font-semibold">CloudP2P</h4>
            </div>
            <div
              className={`${
                active === "home" ? "bg-[#E9EAFF] " : ""
              } mt-10 flex items-center px-14 space-x-4 cursor-pointer`}
              onClick={() => navigate.push("/dashboard/admin")}
            >
              <Image
                src={OVERVIEW}
                alt=""
                // height={32}
                // width={32}
                className="h-5 w-5 self-center rounded-full cursor-pointer "
              />
              <span
                className={`py-4 text-center ${active === "" && "text-white"}`}
              >
                Overview
              </span>
            </div>

            {props.data.map((dats: any) => (
              <>
                <div>
                  <p className="text-[#FFFFFF99] pb-6 font-semibold text-[10px] pt-5 flex mx-12">
                    {dats?.category}
                  </p>
                </div>
                {dats?.sub.map((dats: any, i: any) => (
                  <div
                    key={i}
                    onClick={() => {
                      // setActive("");
                      if (dats.title === "Add User") {
                        setOpen(true);
                      } else {
                        navigate.push(`${dats.path}`);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <div
                      className="flex mx-14 pb-6 items-center space-x-4"
                      // key={i}
                    >
                      <Image
                        src={dats?.icon}
                        alt=""
                        // height={32}
                        // width={32}
                        className="h-[10.06px] w-[11.37px] self-center rounded-full cursor-pointer "
                      />
                      <h3 className="text-white text-[14px]">{dats?.title}</h3>
                    </div>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
      <AddUser open={open} setOpen={setOpen} />
    </div>
  )}
</div>; */
}
