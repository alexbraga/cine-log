import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CustomSnackbar(props) {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.close}>
      <Alert
        onClose={props.close}
        severity={props.severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
