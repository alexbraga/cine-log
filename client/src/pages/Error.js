import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CustomCard from "../layout/CustomCard";
import { AuthContext } from "../context/AuthContext";

function SessionExpired() {
  const authContext = useContext(AuthContext);

  return (
    <CustomCard
      title="Session Expired"
      content={
        <Alert
          sx={{ width: "50%" }}
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                authContext.setIsAuthenticated(false);
                authContext.setUser("");
              }}
            >
              OK
            </Button>
          }
        >
          Your session has expired. Please log in again.
        </Alert>
      }
    />
  );
}

export default SessionExpired;
