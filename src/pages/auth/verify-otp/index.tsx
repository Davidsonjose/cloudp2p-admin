import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/form-control/input";
import axios from "axios";
import API_URL from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSession } from "@/common";
import { setRefreshToken, setToken, setUser } from "../api/slice";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import HeadWidget from "@/components/widgets/HeaderWidget";
import ToastMessage from "@/components/toast/ToastMessage";
function VerifyOtp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [err, setErr] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();
  const [accesstoken, setAcessToken] = useState(null);
  const [admin, setAdmin] = useState<any>(null);
  const [data, setData] = useState(null);
  const [remember, setRemember] = useState(false);

  const handleLogin = (data: any) => {
    setLoading(true);
    setErr("");
    setMessage("");
    const info = {
      email: data.email,
      password: data.password,
    };
    const main = data;
    axios
      .post(`${API_URL}/admin/login`, info)
      .then(({ data }) => {
        if (remember === true) {
          localStorage.setItem("remember", "yes");
          localStorage.setItem("pass", main?.password);
          localStorage.setItem("email", main?.email);
        }
        setLoading(false);
        setMessage("Login Successful");
        setAdmin(data?.payload[0]);
        setAcessToken(data?.accessToken);
        // dispatch(
        //   setRefreshToken({
        //     user: data?.payload[0],
        //     accessToken: data?.accessToken,
        //     refreshtoken: data?.refreshToken,
        //   })
        // );
        dispatch(setRefreshToken(data?.refreshToken));
        dispatch(setToken(data?.accessToken));
        dispatch(setUser(data?.payload[0]));
        setTimeout(() => {
          //   setLoading(!loading);
          setMessage2("Please wait while we redirect you");
        }, 1000);

        reset(data);
      })
      .catch((error) => {
        setLoading(false);
        setErr(error?.response?.data?.message);
      });
  };

  const formData = [
    {
      label: "Enter Code",
      placeholder: "Enter authentication code",
      type: "email",
      register: { ...register("otp") },
    },
  ];

  useEffect(() => {
    if (message2) {
      setTimeout(() => {
        setLoading(true);
        setAdminSession(accesstoken, admin);

        window.location.href = `/dashboard/${admin?.role}`;
      }, 1500);
    }
  }, [message2]);

  return (
    <>
      <HeadWidget title="Otp" />
      <div className="flex justify-center items-center overflow-hidden w-screen h-screen bg-gray-200">
        {loading && (
          <Dialog open={loading === true} onClose={() => console.log("trying")}>
            <CircularProgress color="primary" className="m-5" />
          </Dialog>
        )}
        <div className="flex-1">
          <div className="flex justify-center">
            <div className="w-[90%] md:w-[70%] lg:w-[430px] shadow-lg  bg-white justify-center">
              <ToastMessage text={message} success={message} error={err} />
              <div className="flex justify-center">
                <form
                  className="w-[100%] md:w-[70%] lg:w-[100%]"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="px-8">
                    <h3 className="text-[#0A0E27] text-center font-[400] mt-3 text-[24px]">
                      2-Factor Authentication
                    </h3>
                    <p className="pt-2 font-semibold text-[14px] text-center text-[#0A0E27B2]">
                      Enter the 6-digit code from your authenticator app
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

export default VerifyOtp;
