import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

type Props = {
  message: string;
  handleClose: (
    event: React.SyntheticEvent<any> | Event,
    reason: string
  ) => void;
};

export default function Feedback({ message, handleClose }: Props) {
  let open = !!message;

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      style={{top: "80px"}}
    >
      <Alert severity="error">Keep looking!</Alert>
    </Snackbar>
  );
}
