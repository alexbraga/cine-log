import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

function SignUp() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Set isMounted to false when the component unmounts. Checking under handleAuth, handleSignUp and handleSuccess if isMounted is true ensures that the component is still mounted before updating the state, which prevents memory leak
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  // On successful authentication, set `user` to user's first name and `isAuthenticated` to true, then redirect to `/diary`
  function handleAuth(res) {
    const { user, isAuthenticated } = res.data;

    if (isMounted && isAuthenticated) {
      authContext.setUser(user);
      authContext.setIsAuthenticated(isAuthenticated);
      navigate("/diary");
    }
  }

  // HANDLE LOCAL SIGN UP AND AUTHENTICATION
  async function handleSignUp(event) {
    event.preventDefault();

    try {
      if (userInfo.password.length < 4) {
        setMessage("Password must be at least 4 characters long");
        setOpen(true);
      } else if (!validateForm(userInfo.email)) {
        setMessage(
          "Please enter a valid e-mail address. Check for typos and extra spaces, then try again."
        );
        setOpen(true);
      } else {
        setLoading(true);
        const response = await axios.post("/api/auth/register", userInfo);
        handleAuth(response);
      }
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

export default SignUp;
