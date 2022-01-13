import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmationDialog(props) {
  return (
    <div>
      <Dialog
        sx={{ backdropFilter: "blur(2px)" }}
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        {/* TITLE */}
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>

        {/* MESSAGE */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>

        {/* BUTTONS */}
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button sx={{ mr: 1 }} onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
          >
            {props.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
