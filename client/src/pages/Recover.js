import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import axios from "../config/axiosConfig";
import CustomContainer from "../layout/CustomContainer";

function Recover() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const navigate = useNavigate();

  function handleInfo(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Submit reset password request. If email is valid and user is found, display success message, otherwise display error message
    axios
      .post("/api/auth/recover", { email: email })
      .then((response) => {
        if (response.status === 200) {
          setMessageSeverity("success");
          setMessage(response.data.message);
          setOpen(true);
        }
      })
      .catch((error) => {
        setMessageSeverity("error");
        setMessage(error.response.data.message);
        setOpen(true);
      });
  }

  return (
    <CustomContainer
      title="Reset Password"
      content={
        <div>
          <div>
            <form>
              <Grid container spacing={2}>
                {/* INPUT FIELD */}
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    autoComplete="on"
                    fullWidth
                    label="E-mail Address"
                    name="email"
                    required
                    variant="outlined"
                    value={email}
                    onChange={handleInfo}
                  />
                </Grid>
              </Grid>

              {/* SUBMIT BUTTON */}
              <Button
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Send password reset email
              </Button>
            </form>
          </div>

          {/* ALERT MESSAGE */}
          <div>
            <Collapse sx={{ mt: 2, mb: 2 }} in={open}>
              <Alert severity={messageSeverity}>{message}</Alert>
            </Collapse>
          </div>

          {/* ACTION LINK */}
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Return to Login
          </Link>
        </div>
      }
    />
  );
}

export default Recover;
