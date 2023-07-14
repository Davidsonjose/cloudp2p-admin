import { Button, Dialog, DialogContent, TextField, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Fade } from "react-reveal";
import { format } from "timeago.js";
import moment from "moment";
import ConfirmAction from "./deactivateOfferPrompt";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

type FormValues = {
  subject: string;
  title: string;
  description: string;
};

function BroadcastEmail({ show, setShow }: any) {
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(false);
  const [toastpop, setToastPop] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");

  const [confirmShow, setConfirmShow] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    subject: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (error) {
      setToastPop(true);
    }
    if (message) {
      setToastPop(true);
      setConfirmShow(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [error, message]);

  const ConfirmComponent = () => {
    return (
      <div>
        <>
          <p>
            You are about to deactivate a user. please enter the reason below.
            <TextField
              id="standard-basic"
              label="Reason"
              variant="standard"
              className="w-[100%]"
              onChange={(e) => setReason(e.target.value)}
              value={reason}
            />
          </p>
        </>
        ) : (
        <p>
          You are about to reactivate a user. To continue, confirm using the
          button below.
        </p>
      </div>
    );
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform any necessary form submission logic here
    console.log(formValues);
    // Reset the form
    setFormValues({
      subject: "",
      title: "",
      description: "",
    });
  };

  return (
    <>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setActive("details");
          setShow(false);
        }}
        aria-describedby="alert-dialog-slide-description"
        className="z-[200]"
        PaperProps={{
          style: {
            backgroundColor: "#F6F6F6",
          },
        }}
        // style={{borderR}}
      >
        {/* <LoadingSpinner loading={loading} /> */}
        {/* <ToastMessage show={toastpop} success={message} error={error} /> */}
        <DialogContent className="lg:w-[530px] w-[340px] overflow-x-hidden">
          <Fade>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Subject"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Fade>

          {/* <ConfirmAction
            show={confirmShow}
            setShow={setConfirmShow}
            children={ConfirmComponent()}
            setOk={handleConfirm}
            title={!datas?.active ? "Deactivate User" : "Activate User"}
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BroadcastEmail;
