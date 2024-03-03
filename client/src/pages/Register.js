import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import GoogleLogin from "react-google-login";
import CustomContainer from "../layout/CustomContainer";

function SignUp() {
  const isProduction = process.env.NODE_ENV === "production";

  const serverUrl = isProduction
    ? process.env.REACT_APP_SERVER_URL_PROD
    : process.env.REACT_APP_SERVER_URL_DEV;

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState(null);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Control values on input fields and set them to `userInfo`
  function handleInfo(event) {
    const { name, value } = event.target;

    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function validateForm(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // HANDLE LOCAL SIGN UP AND AUTHENTICATION
  function handleSignUp(event) {
    event.preventDefault();

    if (validateForm(userInfo.email)) {
      axios
        .create()
        .post(`${serverUrl}/api/auth/register`, userInfo)
        .then((response) => {
          // On successful authentication, set `user` to user's first name and `isAuthenticated` to true, then redirect to `/diary`
          const { user, isAuthenticated } = response.data;

          if (isAuthenticated) {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            navigate("/diary");
          }
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setOpen(true);
        });
    } else {
      setMessage(
        "Please enter a valid e-mail address. Check for typos and extra spaces, then try again."
      );
      setOpen(true);
    }
  }

  // HANDLE GOOGLE AUTHENTICATION
  function handleSuccess(response) {
    axios
      .create()
      .post(`${serverUrl}/api/auth/google`, { token: response.tokenId })
      .then((res) => {
        const { user, isAuthenticated } = res.data;

        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        navigate("/diary");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFailure(response) {
    setMessage("Authentication failed");
  }

  return (
    <CustomContainer
      title="Sign up"
      content={
        <div>
          <form>
            <Grid container spacing={2}>
              {/* SIGN UP FIELDS */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  autoFocus
                  fullWidth
                  label="First Name"
                  name="first_name"
                  required
                  variant="outlined"
                  value={userInfo.first_name}
                  onChange={handleInfo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  required
                  variant="outlined"
                  value={userInfo.last_name}
                  onChange={handleInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="E-mail Address"
                  name="email"
                  required
                  variant="outlined"
                  value={userInfo.email}
                  onChange={handleInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  required
                  variant="outlined"
                  value={userInfo.password}
                  onChange={handleInfo}
                />
              </Grid>
            </Grid>

            {/* SIGN UP BUTTON */}
            <Button
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              type="submit"
              variant="contained"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </form>

          {/* ALERT - ERROR MESSAGE */}
          <div>
            <Collapse sx={{ mt: 2, mb: 2 }} in={open}>
              <Alert severity="error">{message}</Alert>
            </Collapse>
          </div>

          {/* ACTION LINK */}
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
          </Link>

          {/* SIGN UP WITH GOOGLE */}
          <Divider
            sx={{
              mt: 4,
              mb: 4,
              "&.MuiDivider-root": {
                "&::before": {
                  borderTop: "thin solid grey",
                },
                "&::after": {
                  borderTop: "thin solid grey",
                },
              },
            }}
          >
            OR
          </Divider>

          <div style={{ textAlign: "center" }}>
            <GoogleLogin
              className="google-btn"
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              redirectUri={
                isProduction
                  ? process.env.REACT_APP_CLIENT_URL_PROD
                  : process.env.REACT_APP_CLIENT_URL_DEV
              }
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              theme="dark"
              buttonText="Sign up with Google"
              cookiePolicy={"single_host_origin"}
              autoLoad={false}
            />
          </div>
        </div>
      }
    />
  );
}

export default SignUp;
