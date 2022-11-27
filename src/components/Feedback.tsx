import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

type Props = {
  message: string;
  handleClose: (
    event: React.SyntheticEvent<Element> | Event,
    reason?: string
  ) => void;
};

export default function Feedback({ message, handleClose }: Props) {
  let severity: AlertColor;

  if (message.includes("Keep looking!")) {
    severity = "error";
  } else {
    severity = "success";
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!message}
      autoHideDuration={3000}
      onClose={handleClose}
      style={{ top: "80px" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
