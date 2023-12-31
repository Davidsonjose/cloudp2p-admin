import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/form-control/input";
import axios from "axios";
import API_URL from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSession } from "@/common";
import {
  setRefreshToken,
  setToken,
  setUser,
} from "../../../features/auth/api/slice";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import HeadWidget from "@/components/widgets/HeaderWidget";
import ToastMessage from "@/components/toast/ToastMessage";
import { useRouter } from "next/navigation";
function Login() {
  // const [email, setEmail] = useState("")
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [err, setErr] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();
  const [popshow, setPopShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const handleLogin = (data: any) => {
    setLoading(true);
    setErr("");
    setMessage("");
    setPopShow(false);

    const info = {
      email: data.email,
      pwd: data.password,
    };
    const main = data;
    axios
      .post(`${API_URL}/auth`, info)
      .then(({ data }) => {
        if (remember === true) {
          localStorage.setItem("remember", "yes");
          localStorage.setItem("pass", main?.password);
          localStorage.setItem("email", main?.email);
        }
        setLoading(false);
        setMessage("Login Successful");
        setPopShow(true);
        console.log(data);
        dispatch(setRefreshToken(data?.data?.refreshToken));
        dispatch(setToken(data?.data?.accessToken));
        dispatch(setUser(data?.data));
        setAdminSession(
          data?.data?.accessToken,
          data?.data,
          data?.data?.refreshToken
        );
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1000);

        reset(data);
      })
      .catch((error) => {
        setLoading(false);
        setPopShow(true);
        setErr(error?.response?.data?.message[0]);
      });
  };

  const formData = [
    {
      label: "User ID",
      placeholder: "enter User Id",
      type: "email",
      register: { ...register("email") },
    },
    {
      label: "Password",
      placeholder: "Enter Password",
      type: "password",
      register: { ...register("password") },
    },
  ];

  // useEffect(() => {
  //   if (message2) {
  //     setTimeout(() => {
  //       setLoading(true);
  //       if (admin?.role === "admin") {
  //         setAdminSession(accesstoken, admin);
  //       } else {
  //       }
  //       window.location.href = `/dashboard/${admin?.role}`;
  //     }, 1500);
  //   }
  // }, [message2]);

  useEffect(() => {
    // const isremember = localStorage.getItem("remember");
    // const email = localStorage.getItem("email");
    // // alert(email)
    // const pass = localStorage.getItem("pass");
    // if (isremember === "yes") {
    //   setValue("password", pass);
    //   setValue("email", email);
    // }
  }, []);
  return (
    <>
      <HeadWidget title="Login" />
      <div className="flex justify-center items-center overflow-hidden w-screen h-screen bg-gray-200">
        {loading && (
          <Dialog
            open={loading === true}
            onClose={() => console.log("trying")}
            // TransitionComponent={Transition}
          >
            {/* <div className="p-5">
              
            </div> */}
            <CircularProgress color="primary" className="m-5" />
          </Dialog>
        )}
        <div className="flex-1">
          <div className="flex justify-center">
            <div className="w-[90%] md:w-[70%] lg:w-[430px] shadow-lg  bg-white justify-center">
              <ToastMessage show={popshow} success={message} error={err} />
              <div className="flex justify-center">
                <form
                  className="w-[100%] md:w-[70%] lg:w-[100%]"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="px-8">
                    <h3 className="text-[#0A0E27] text-center font-[400] mt-3 text-[24px]">
                      Hi, Welcome
                    </h3>
                    <p className="pt-2 font-semibold text-[16px] text-center text-[#0A0E27B2]">
                      Sign in to continue to an awesome experience
                    </p>
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
                    <div className="justify-between items-center flex mb-4">
                      <div className="flex items-center space-x-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          checked={remember}
                          onChange={() => {
                            setRemember(!remember);
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span
                          // onClick={() => setShowModal(true)}
                          className="text-[#979797] font-semibol text-sm cursor-pointer"
                        >
                          Keep me signed in.
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#17193F] ">
                        Forgot Password?
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="py-2 mb-4 rounded-lg w-[87%] mx-auto justify-center bg-[#17193F] flex"
                      type="submit"
                    >
                      <span className="text-white py-1 font-semibold text-base">
                        Sign In
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
