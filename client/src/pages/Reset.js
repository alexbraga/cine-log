import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import axios from "axios";
import CustomContainer from "../layout/CustomContainer";

function Reset() {
  const [showForm, setShowForm] = useState(false);

  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messageSeverity, setMessageSeverity] = useState("success");

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // If request with token provided on `location.pathname` is valid, show password change form; otherwise display error message
    axios
      .create()
      .get(`/auth${location.pathname}`)
      .then((response) => {
        if (response.status === 200) {
          setShowForm(true);
        }
      })
      .catch((error) => {
        setShowForm(false);
        setMessageSeverity("error");
        setMessage(error.response.data.message);
        setOpen(true);
      });
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
      password.new_password.length > 0 &&
      password.new_password === password.confirm_password
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    // If new password pass the validation check, make a POST request with the new password. On success, display success message; otherwise display error message
    if (validateForm()) {
      axios
        .create()
        .post(`/auth${location.pathname}`, { password: password.new_password })
        .then((response) => {
          if (response.status === 200) {
            setMessageSeverity("success");
            setMessage(response.data.message);
            setOpen(true);
            setPassword({
              new_password: "",
              confirm_password: "",
            });
          }
        })
        .catch((error) => {
          setMessageSeverity("error");
          setMessage(error.response.data.message);
          setOpen(true);
        });
    }
  }

  return (
    <CustomContainer
      title="Password Change"
      content={
        <div>
          <div>
            {showForm ? (
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
