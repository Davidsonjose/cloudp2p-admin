import { useState } from "react";

function Input(props?: any) {
  const [show, setShow] = useState(true);

  return (
    <div className=' mb-2 lg:mb-6 relative'>
      <div className='flex justify-between items-center'>
        <label className='block text-[#0A0E27]  text-sm  mb-2 font-semibold'>
          {props.label}
        </label>
        {props.label === "PASSWORD" && (
          <span className='text-xs font-semibold text-[#1021BC] '>
            reset password?
          </span>
        )}
      </div>
      <input
        className={`appearance-none border border-gray-300 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.className}`}
        {...props.register}
        placeholder={props.placeholder}
        max={props.type === "number" && props.limit === true && 11}
        type={
          props.type === "password" ? (show ? "password" : "text") : "text"
        }
        props={props.defaultValue}
      />
      {/* left-[68%] top-[71%]  */}
      {props.label === "Password" && (
        <div className=''>
          <div className='absolute left-[90%] top-[50%]'>
            {show ? (
              <i
                className={`fa-solid fa-eye-slash  text-[#777676]`}
                onClick={() => setShow(!show)}
              ></i>
            ) : (
              <i
                onClick={() => setShow(!show)}
                className={`fa-solid fa-eye  text-[#777676]`}
              ></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
