import axios from "axios";
import { getAdmin, getAdminToken, getUser } from "common";
import API_URL from "config";
import LoadingSpinner from "layouts/loadingSpinner";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CircularProgress } from "@mui/material";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Information() {
  const token = getAdminToken();
  const user = getAdmin();
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
          <option value="">select enterprise</option>
          <option value="allcompany">all</option>
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
    window.location.href = "#";
    const info = {
      text: text,
      subject: data?.subject,
      company: data?.company,
      to: data?.recipient,
      admin: user?._id,
    };
    console.log(info);
    axiosCreate
      .post(`${API_URL}/admin/send-information`, info)
      .then(({ data }) => {
        setMessage("Information sent successfully");
        setLoading(false);
        setTimeout(() => {
          setLoading(true);
          window.location.href = "/dashboard/admin";
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
        setErr(error?.response?.data?.message);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMail = (data: any) => {
    setLoading(true);
    setMessage("");
    setErr("");
    window.location.href = "#";
    const info = {
      text: text,
      subject: data?.subject,
      company: data?.company,
      to: data?.recipient,
      admin: user?._id,
    };
    console.log(info);
    axiosCreate
      .post(`${API_URL}/admin/send-information/mail`, info)
      .then(({ data }) => {
        setMessage("Information sent successfully");
        setLoading(false);
        setTimeout(() => {
          setLoading(true);
          window.location.href = "/dashboard/admin";
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
        setErr(error?.response?.data?.message);
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

        <button
          className="text-white mb-4 p-4 bg-blue-600 rounded-lg"
          onClick={handleClickOpen}
        >
          Send via email
        </button>

        {/* <div className="">
          <i className="fa-solid fa-message text-3xl text-white"></i>
          <p className="">Send mail message</p>
        </div> */}
        <form className="bg-white p-8" onSubmit={handleSubmit(handleSend)}>
          <SelectTo label="To" {...register("recipient")} />
          <SelectCompany label="Enterprise" {...register("company")} />
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
                  placeholder="Subject"
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
            <button
              className="transition ease-in-out delay-150 py-2 px-4 rounded-md text-white bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 "
              type="submit"
            >
              <i className="fa-solid fa-paper-plane text-white"></i> Send
            </button>
            <div></div>
          </div>
        </form>
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Broadcast email
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Send
            </Button> */}
          </Toolbar>
        </AppBar>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}

        {loading && (
          <Dialog
            open={loading === true}
            onClose={() => console.log("trying")}
            TransitionComponent={Transition}
          >
            {/* <div className="p-5">
              
            </div> */}
            <CircularProgress color="secondary" className="m-5" />
          </Dialog>
        )}
        {message && (
          <div className="p-4 mb-10 mt-10 mx-10 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
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
        <form className="bg-white p-8" onSubmit={handleSubmit(handleMail)}>
          <SelectTo label="To" {...register("recipient")} />
          <SelectCompany label="Enterprise" {...register("company")} />
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
                  placeholder="Subject"
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

          {/* <Button autoFocus color="inherit" type="submit">
            Send
          </Button> */}
          <div>
            <button
              className="transition ease-in-out delay-150 py-2 px-4 rounded-md text-white bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 "
              type="submit"
            >
              <i className="fa-solid fa-paper-plane text-white"></i> Send
            </button>
            <div></div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default Information;
