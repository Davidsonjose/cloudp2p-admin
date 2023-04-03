import axios from "axios";
import { getAdminToken } from "common";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
function Information() {
  const token = getAdminToken();
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [message, setMessage] = useState<String>("");
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState<String>("");
  const [companies, setCompanies] = useState([]);
  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      //   "Content-Type": "multipart/form-data",
    },
  });

  useEffect(() => {
    setLoading(true);
    axiosCreate
      .get(`${API_URL}/company`)
      .then(({ data }) => {
        setLoading(false);
        setCompanies(data?.payload[0]);
      })
      .catch((error) => {
        setLoading(false);
        // console.log("an error occured");
        setErr(error?.response?.data?.message);
      });
  }, []);

  const SelectTo = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="font-semibold pb-2 text-gray-700">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">select recipient staff</option>
          <option value="allrecipient">all</option>
          <option value="manager">enterprise managers</option>
          <option value="staff">staffs</option>
          {/* {companies?.map((dats: any) => (
            <option value={dats._id}>{dats.name}</option>
          ))} */}
        </select>
      </>
    )
  );
  const SelectCompany = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="font-semibold pb-2 text-gray-700">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select company</option>
          <option value="allcompany">All</option>
          {companies?.map((dats: any) => (
            <option value={dats._id}>{dats.name}</option>
          ))}
        </select>
      </>
    )
  );
  const formData = [
    {
      label: "Subject",
      placeholder: "subject",
      type: "text",
      register: { ...register("subject") },
    },
    {
      label: "Message",
      placeholder: "Message",
      type: "text",
      register: { ...register("message") },
      textarea: true,
    },
    // {
    //   label: "Email Address",
    //   placeholder: "enter email",
    //   type: "email",
    //   register: { ...register("email") },
    // },
    // {
    //   label: "Designation",
    //   placeholder: "enter designation",
    //   type: "text",
    //   register: { ...register("designation") },
    // },
  ];
  const handleSend = (data: any) => {
    setLoading(true);
    setMessage("");
    setErr("");

    const info = {
      text: data?.text,
      subject: data?.subject,
      to: data?.recipient,
      company: data?.company,
    };
    axiosCreate
      .post(`${API_URL}/admin/send-information`, info)
      .then(({ data }) => {
        setMessage("Information sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="">
        {loading && (
          <LoadingSpinner loading={loading} setLoading={setLoading} />
        )}
        {message && (
          <div className="p-4 mb-10 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
            <span className="text-white font-semibold ">{message}</span>
            <div onClick={() => setMessage("")}>
              <i className="fa-solid fa-circle-xmark text-white"></i>
            </div>
          </div>
        )}
        {err && (
          <div className="p-4 mb-10 rounded-lg bg-red-500 flex justify-between items-center">
            <span className="text-white font-semibold ">{err}</span>
            <div onClick={() => setErr("")}>
              <i className="fa-solid fa-circle-xmark text-white"></i>
            </div>
          </div>
        )}

        <div className="bg-[#C9DAD7] rounded-t-lg px-10 py-4 ">
          <p className="font-bold text-xl">
            New message <i className="fa-solid text-white fa-envelope"></i>
          </p>
        </div>
        <form className="bg-white p-8" onSubmit={handleSubmit(handleSend)}>
          <SelectTo label="TO" {...register("recipient")} />
          <SelectCompany label="Company" {...register("company")} />
          {formData.map((item, i) => (
            <>
              {/* <Input
              register={item.register}
              placeholder={item.placeholder}
              type={item.type}
              label={item.label}
            /> */}
              {!item.textarea ? (
                <input
                  className="border-b border-b-gray-300 p-4 w-full mb-6 outline-none"
                  placeholder="subject"
                  // value={subject}
                  {...item?.register}
                  // onChange={(e) => setSubject(e.target.value)}
                />
              ) : (
                <div>
                  <textarea
                    className="border border-gray-300 p-4 w-full h-56 outline-none resize-none"
                    placeholder="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              )}
            </>
          ))}
          <div>
            <button className="transition ease-in-out delay-150 py-2 px-4 rounded-md text-white bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ">
              <i className="fa-solid fa-paper-plane text-white"></i> Send
            </button>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Information;
