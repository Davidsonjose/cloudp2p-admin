import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./backdrop";
import Image from "next/image";
// import { HURRAY, MODAL_GRADIENT } from "@/asset";
import React, { useEffect, useState } from "react";
import Input from "../form-control/input";
import { useForm } from "react-hook-form";
import LoadingSpinner from "@/layouts/loadingSpinner";
import { addNewAdminUser } from "@/functions/handler/user/admin";
import ToastMessage from "../toast/ToastMessage";

const AddUserPop = ({
  handleClose,
  text1,
  setShow,
  text2,
  title,
  show,
}: {
  handleClose?: () => void;
  text1?: string;
  setShow: (show: boolean) => void;
  title?: string;
  text2?: string;
  show: boolean;
}) => {
  const [opacity, setOpacity] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [showtoast, setShowToast] = React.useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  // const dropIn = {
  //   hidden: {
  //     y: "-100vh",
  //     opacity: opacity,
  //   },
  //   visible: {
  //     y: 1,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.1,
  //       type: "spring",
  //       damping: 12,
  //       stiffness: 800,
  //       when: "beforeChildren",
  //       bounce: 0.1, // Adjust the bounce value to control the intensity of the bounce effect
  //     },
  //   },
  //   exit: {
  //     y: "-100vh",
  //     opacity: 0,
  //     transition: {
  //       duration: 0.1,
  //       type: "spring",
  //       damping: 25,
  //       stiffness: 500,
  //     },
  //   },
  // };

  const dropIn = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4, // Adjust the duration for the desired speed of the fade-in animation
        ease: "easeOut", // Adjust the easing function for the animation
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3, // Adjust the duration for the desired speed of the fade-out animation
        ease: "easeIn", // Adjust the easing function for the animation
      },
    },
  };

  const handleClick = () => {
    setIsOpen(false);
    setShowToast(false);
    setTimeout(() => {
      setShow(false);
      //   setIsOpen(true);
    }, 400);
  };

  useEffect(() => {
    if (show) {
      setIsOpen(true);
    }
  }, [show]);

  const formData = [
    {
      label: "Firstname",
      placeholder: "Enter firstname",
      type: "text",
      register: { ...register("firstname") },
    },
    {
      label: "Lastname",
      placeholder: "Enter lastname",
      type: "text",
      register: { ...register("lastname") },
    },
    {
      label: "Email",
      placeholder: "Enter email",
      type: "email",
      register: { ...register("email") },
    },
    {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      register: { ...register("password") },
    },
  ];

  const Select = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <p className="pb-2 font-semibold text-[#0A0E27]">{label}</p>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-white dark:placeholder-gray-700 dark:text-gray-600 dark:focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Role</option>
          <option value="SUPPORT">Support</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="MANAGER">Manager</option>
        </select>
      </>
    )
  );

  const roles = ["SUPPORT", "SUPERVISOR", "MANAGER"];

  Select.displayName = "";
  const handleCreation = (data: any) => {
    setShowToast(false);
    setError("");
    setMessage("");
    const info = {
      email: data?.email,
      pwd: data?.password,
      lastName: data?.lastname,
      role: data?.role,
      firstName: data?.firstname,
    };

    addNewAdminUser({
      data: info,
      setLoading: setLoading,
      setMessage: setMessage,
      setError: setError,
    });
  };

  useEffect(() => {
    setShowToast(true);
  }, [message, error]);

  console.log(error, message);
  return (
    <>
      {show && (
        <Backdrop onClick={() => handleClick()}>
          <AnimatePresence mode="wait">
            <LoadingSpinner loading={loading} />
            <ToastMessage show={showtoast} error={error} success={message} />
            {isOpen && (
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal relative h-[600px] flex justify-center  bg-white lg:w-[500px] md:w-[460px] rounded-[30px]"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <form className="" onSubmit={handleSubmit(handleCreation)}>
                  {formData.map((item, i) => (
                    <div className="mt-5" key={i}>
                      <Input
                        register={item.register}
                        placeholder={item.placeholder}
                        type={item.type}
                        label={item.label}
                      />
                    </div>
                  ))}
                  <Select label="Role" {...register("role")} />
                  <div className="flex-1 mt-4">
                    <button
                      // onClick={handleClose}
                      type="submit"
                      className="rounded-lg w-full py-4 flex-1 bg-[#17193F] text-white"
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </Backdrop>
      )}
    </>
  );
};

export default AddUserPop;
