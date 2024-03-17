import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import CustomContainer from "../layout/CustomContainer";
import { TailSpin } from "react-loader-spinner";

function Recover() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Create a new instance for specific requests without the response interceptor
  const axiosInstance = axios.create({
    baseURL: axiosConfig.defaults.baseURL,
    withCredentials: axiosConfig.defaults.withCredentials,
  });

  function handleInfo(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Submit reset password request. If email is valid and user is found, display success message, otherwise display error message
    try {
      setLoading(true);
      
      const response = await axiosInstance.post("/api/auth/recover", {
        email: email,
      });

      if (response.status === 200) {
        setLoading(false);
        setMessageSeverity("success");
        setMessage(response.data.message);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessageSeverity("error");
      setMessage(error.response.data.message);
      setOpen(true);
    }
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
              {loading ? (
                <div>
                  <br />
                  <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#9aaabe"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="loader-container"
                  />
                </div>
              ) : (
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
              )}
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
