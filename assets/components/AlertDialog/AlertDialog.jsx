import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({text, color, onLogout}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("handleClickOpen 1")
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handleClose 2")

  };
  const handleAgree = () => {
    setOpen(false);
    onLogout()
  }

  return (
    <div>
      <Button color={color} variant="contained"  onClick={handleClickOpen}>
        {text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="JJ"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you want logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
