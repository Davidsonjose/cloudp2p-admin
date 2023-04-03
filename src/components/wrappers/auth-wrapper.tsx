import { DOTS, FADED_LOGO } from "assets";
import { authWrapperTypes } from "../types";

function AuthWrapper({ children }: authWrapperTypes) {
  return (
    <div className="w-screen h-screen relative bg-[#EDF4FF] flex justify-center items-center">
      <img
        src={DOTS}
        alt=""
        className="h-40 w-40 absolute top-10 left-[4%] lg:left-[14%] z-0"
      />
      <img
        src={FADED_LOGO}
        alt=""
        className="h-40 w-40 absolute top-0 lg:top-[4%] right-0 lg:right-[14%] z-0"
      />
      <div className="w-[90%] h-[70%] lg:w-[50%] rounded-md shadow-wrapper lg:h-[80%] bg-white z-10">
        {children}
      </div>
      <img
        src={FADED_LOGO}
        alt=""
        className="h-40 w-40 absolute bottom-0 lg:bottom-10  left-0 lg:left-[14%] z-0"
      />
      <img
        src={DOTS}
        alt=""
        className="h-40 w-40 absolute bottom-10 right-[6%] lg:right-[16%] z-0"
      />
    </div>
  );
}

{
  /* <div className='w-screen h-screen relative bg-[#EDF4FF] flex justify-center items-center'>
<img src={DOTS} alt='' className='h-40 w-40 absolute top-10 left-[4%] lg:left-[14%] z-0' />
<img
	src={FADED_LOGO}
	alt=''
	className='h-40 w-40 absolute top-0 lg:top-[4%] right-0 lg:right-[14%] z-0'
/>
<div className='w-[90%] h-[70%] lg:w-[50%] rounded-md shadow-wrapper lg:h-[80%] bg-white z-10'>
	{children}
</div>
<img
	src={FADED_LOGO}
	alt=''
	className='h-40 w-40 absolute bottom-0 lg:bottom-10  left-0 lg:left-[14%] z-0'
/>
<img
	src={DOTS}
	alt=''
	className='h-40 w-40 absolute bottom-10 right-[6%] lg:right-[16%] z-0'
/>
</div> */
}

export default AuthWrapper;
