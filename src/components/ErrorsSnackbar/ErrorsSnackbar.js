import React, { useState, useEffect } from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Alert from "../Alert";

export default function ErrorsSnackbar({ errors }) {
  const [queuedList, setQueuedList] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
    setOpen(false);
  };

  useEffect(() => {
    if (errors.length && !messageInfo) {
      const newQueuedList = [errors[0], ...queuedList];
      if(errors[0]?.id !== queuedList[0]?.id){
        setQueuedList(newQueuedList);
        setMessageInfo(newQueuedList[0]);
        setOpen(true);
      }
    } else if (errors.length && messageInfo && open) {
      setOpen(false);
    }
    return () => {
      setOpen(false);
      setMessageInfo(undefined);
    };
  }, [errors]);

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionProps={{
        onExit: handleExited,
      }}
    >
      {messageInfo && (
        <Alert onClose={handleClose} severity="error">
          {messageInfo.message}
        </Alert>
      )}
    </MuiSnackbar>
  );
}
