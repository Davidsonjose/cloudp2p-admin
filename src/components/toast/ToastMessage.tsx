import React, { useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ToastProps } from "@/interface";
function ToastMessage({ error, success, show }: ToastProps) {
  useEffect(() => {
    if (success) {
      toast.success(success, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error]);

  const toastContainerStyle = {
    width: "500px", // Set the desired width here
  };

  return (
    <div className="z-[-1000] ">
      {show && (
        <ToastContainer
          transition={Slide}
          style={toastContainerStyle}
          className="z-[100]"
        ></ToastContainer>
      )}
    </div>
  );
}

export default ToastMessage;
