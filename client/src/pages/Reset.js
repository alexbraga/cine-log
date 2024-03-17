import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function Reset() {
  const [showForm, setShowForm] = useState(false);

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messageSeverity, setMessageSeverity] = useState("success");

  const navigate = useNavigate();

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  // Create a new instance for specific requests without the response interceptor
  const axiosInstance = axios.create({
    baseURL: axiosConfig.defaults.baseURL,
    withCredentials: axiosConfig.defaults.withCredentials,
  });

  useEffect(() => {
    // If request with token provided on `location.pathname` is valid, show password change form; otherwise display error message
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          `/api/auth${location.pathname}`
        );
        if (response.status === 200) {
          setLoading(false);
          setShowForm(true);
        }
      } catch (error) {
        setLoading(false);
        setShowForm(false);
        setMessageSeverity("error");
        setMessage(error.response.data.message);
        setOpen(true);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Control values on input fields and set them to `password` object
  function handleInfo(event) {
    const { name, value } = event.target;

    setPassword((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function validateForm() {
    return (
      password.new_password.length >= 4 &&
      password.new_password === password.confirm_password
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // If new password pass the validation check, make a POST request with the new password. On success, display success message; otherwise display error message
    if (validateForm()) {
      try {
        setLoading(true);

        const response = await axiosInstance.post(
          `/api/auth${location.pathname}`,
          {
            password: password.new_password,
          }
        );

        if (response.status === 200) {
          setLoading(false);
          setMessageSeverity("success");
          setMessage(response.data.message);
          setOpen(true);
          setPassword({
            new_password: "",
            confirm_password: "",
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessageSeverity("error");
        setMessage(error.response.data.message);
        setOpen(true);
      }
    } else {
      setMessageSeverity("error");
      if (
        password.new_password.length < 4 &&
        password.new_password !== password.confirm_password
      ) {
        setMessage(
          "• Password must be at least 4 characters long\n" +
            "• 'New Password' and 'Confirm Password' fields don't match"
        );
      } else if (password.new_password.length < 4) {
        setMessage("Password must be at least 4 characters long");
      } else {
        setMessage("'New Password' and 'Confirm Password' fields don't match");
      }

      setOpen(true);
    }
  }

  return (
    <CustomContainer
      title="Password Change"
      content={
        <div>
          <div>
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
            ) : showForm ? (
              <form>
                <Grid container spacing={2}>
                  {/* INPUT FIELDS */}
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      autoFocus
                      fullWidth
                      label="New Password"
                      name="new_password"
                      required
                      variant="outlined"
                      value={password.new_password}
                      onChange={handleInfo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      fullWidth
                      label="Confirm Password"
                      name="confirm_password"
                      required
                      variant="outlined"
                      value={password.confirm_password}
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
                    Submit
                  </Button>
                )}
              </form>
            ) : null}
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

export default Reset;
