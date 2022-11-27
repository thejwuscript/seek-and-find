import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

type Props = {
  message: string;
  closeSnackBar: () => void;
}

export default function Feedback({message, closeSnackBar}: Props) {
  let open = !!message;

  return (
      <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackBar}>
        <Alert severity='error'>Keep looking!</Alert>
      </Snackbar>
  )
};