import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
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

function Login() {
  const isProduction = process.env.NODE_ENV === "production";

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const { state } = useLocation();

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState(null);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // Control values on input fields and set them to `userInfo` object
  function handleInfo(event) {
    const { name, value } = event.target;

    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  // HANDLE LOCAL AUTHENTICATION
  function handleLogin(event) {
    event.preventDefault();

    axios
      .create()
      .post("/auth/login", userInfo)
      .then((response) => {
        // On successful authentication, set `user` to user's first name and `isAuthenticated` to true, then redirect to the route that user was trying to access, otherwise redirect to `/diary`
        const { user, isAuthenticated } = response.data;

        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);

          setUserInfo((prevValue) => {
            return {
              ...prevValue,
              password: "",
            };
          });
          
          navigate(state?.path || "/diary");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpen(true);
      });
  }

  // HANDLE GOOGLE AUTHENTICATION
  function handleSuccess(response) {
    axios
      .create()
      .post("/auth/google", { token: response.tokenId })
      .then((res) => {
        const { user, isAuthenticated } = res.data;

        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        navigate(state?.path || "/diary");
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
      title="Login"
      content={
        <div>
          <form>
            <Grid container spacing={2}>
              {/* LOGIN FIELDS */}
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  autoComplete="on"
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

            {/* LOGIN BUTTON */}
            <Button
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              type="submit"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>

          {/* ALERT - ERROR MESSAGE */}
          <div>
            <Collapse sx={{ mt: 2, mb: 2 }} in={open}>
              <Alert severity="error">{message}</Alert>
            </Collapse>
          </div>

          {/* ACTION LINKS */}
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => {
              navigate("/recover");
            }}
          >
            Forgot your password?
          </Link>

          <Typography sx={{ mt: 2 }}>
            Don't have an account yet?{" "}
            <span>
              <Link
                style={{ cursor: "pointer", textDecoration: "none" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </Link>
            </span>
          </Typography>

          {/* SIGN IN WITH GOOGLE */}
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
              cookiePolicy={"single_host_origin"}
              autoLoad={false}
            />
          </div>
        </div>
      }
    />
  );
}

export default Login;
