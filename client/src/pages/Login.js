import React, { useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import axios from "../config/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { GoogleLogin } from "@react-oauth/google";
import CustomContainer from "../layout/CustomContainer";
import { TailSpin } from "react-loader-spinner";

function Login() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const { state } = useLocation();

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // Set isMounted to false when the component unmounts. Checking under handleAuth, handleLogin and handleSuccess if isMounted is true ensures that the component is still mounted before updating the state, which prevents memory leak
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  // On successful authentication, set `user` to user's first name and `isAuthenticated` to true, then redirect to the route that user was trying to access, otherwise redirect to `/diary`
  function handleAuth(res) {
    const { user, isAuthenticated } = res.data;

    if (isMounted && isAuthenticated) {
      authContext.setUser(user);
      authContext.setIsAuthenticated(isAuthenticated);
      navigate(state?.path || "/diary");
    }
  }

  // HANDLE LOCAL AUTHENTICATION
  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", userInfo);
      handleAuth(response);
    } catch (error) {
      if (isMounted.current) {
        setLoading(false);
        setMessage(error.response.data.message);
        setOpen(true);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  // HANDLE GOOGLE AUTHENTICATION
  async function handleSuccess(credentials) {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/google", credentials);
      handleAuth(response);
    } catch (error) {
      if (isMounted.current) {
        setLoading(false);
        setMessage(error.message);
        console.log("Google Authorization failed: " + error);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  function handleFailure() {
    setMessage("Login failed");
  }

  return loading ? (
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
  ) : (
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
              onSuccess={(credentialResponse) => {
                handleSuccess(credentialResponse);
              }}
              onError={handleFailure}
              theme="filled_blue"
              width="312px"
            />
          </div>
        </div>
      }
    />
  );
}

export default Login;
