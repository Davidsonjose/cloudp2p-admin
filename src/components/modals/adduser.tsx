import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import Input from "@/components/form-control/adduser";
import {Fade} from "react-reveal"
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddUser({ open, setOpen }: any) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formData = [
    {
      label: "User Name",
      placeholder: "Enter Full Name",
      type: "email",
      register: { ...register("email") },
    },
    {
      label: "Create Password",
      placeholder: "Enter Password",
      type: "password",
      register: { ...register("password") },
    },
  ];

  const Select = React.forwardRef(
    ({ onChange, onBlur, name, label }: any, ref: any) => (
      <>
        <label className="pb-3 font-semibold text-[#0A0E27]">{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-3 p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white border-gray-200 dark:placeholder-gray-700 dark:text-gray-600 dark:focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Role</option>
          <option value="">Admin</option>
          <option value="">Super Admin</option>
        </select>
      </>
    )
  );

  const handleCreation = () => {
    return;
  };


  
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="z-[200]"
      >
        <DialogTitle className="text-center text-[#0A0E27]">{"Add User"}</DialogTitle>
        <DialogContent className="w-[464px]">
          <DialogContentText id="alert-dialog-slide-description">
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
            </form>
            <div className="flex-1 mt-4">
              <button
                onClick={handleClose}
                className="rounded-lg w-full py-4 flex-1 bg-[#17193F] text-white"
              >
                Add User
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddUser;
