import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmAction({
  setOk,
  title,
  show,
  setShow,
  children,
}: {
  title: string;
  setOk: () => void;
  show: boolean;
  setShow: (type: boolean) => void;
  children: React.ReactNode;
}) {
  const handleClose = () => {
    // setOk();
    setShow(false);
  };
  const handleAgree = () => {
    setShow(false);
    setOk;
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <button
            className="bg-red-600 rounded-lg py-2 px-4 text-white"
            onClick={setOk}
            autoFocus
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmAction;
