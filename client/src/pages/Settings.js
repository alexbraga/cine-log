import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CustomCard from "../layout/CustomCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomSnackbar from "../components/CustomSnackbar";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import { AuthContext } from "../context/AuthContext";
import axios from "../config/axiosConfig";
import useMediaQuery from "@mui/material/useMediaQuery";
import DualButton from "../components/buttons/DualButton";

function Settings() {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [editInfo, setEditInfo] = useState(false);
  const [changePswd, setChangePswd] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const authContext = useContext(AuthContext);

  const matches = useMediaQuery("(min-width:900px)");
  const matchesLg = useMediaQuery("(min-width:1200px)");

  // GET USER INFO
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    axios
      .get("/api/settings")
      .then((response) => {
        const { first_name, last_name, email } = response.data;

        setUserInfo((prevValue) => {
          return {
            ...prevValue,
            first_name: first_name,
            last_name: last_name,
            email: email,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo]);

  // HANDLE ON CHANGE
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

  // HANDLE PERSONAL INFO
  function handleSubmitInfo() {
    axios
      .patch("/api/settings/user", userInfo)
      .then((response) => {
        setEditInfo(false);
        setMessage(response.data.message);
        setSeverity("success");
        setOpenSnackbar(true);
        authContext.setUser(userInfo.first_name);
      })
      .catch((err) => {
        setMessage("Something went wrong. Please, try again.");
        setSeverity("error");
        setOpenSnackbar(true);
      });
  }

  // HANDLE PASSWORD CHANGE
  function validateForm() {
    return (
      userInfo.old_password.length >= 4 &&
      userInfo.new_password.length >= 4 &&
      userInfo.new_password === userInfo.confirm_password
    );
  }

  function clearFields() {
    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        old_password: "",
        new_password: "",
        confirm_password: "",
      };
    });
  }

  // Execute password fields validation check and display success or error message based on response. If validation fails, display error message with details
  async function handleSubmitPswd() {
    if (validateForm()) {
      try {
        const response = await axios.patch("/api/settings/password", {
          old_password: userInfo.old_password,
          password: userInfo.new_password,
        });

        if (response.status === 200) {
          setSeverity("success");
          setMessage(response.data.message);
          setOpenSnackbar(true);
          setChangePswd(false);
          clearFields();
        }
      } catch (error) {
        setSeverity("error");
        setMessage("Incorrect 'Old Password'");
        setOpenSnackbar(true);
        setChangePswd(false);
        clearFields();
      }
    } else {
      setSeverity("error");
      if (
        userInfo.new_password.length < 4 &&
        userInfo.new_password !== userInfo.confirm_password
      ) {
        setMessage(
          "New password must be at least 4 characters long. 'New Password' and 'Confirm Password' fields don't match"
        );
      } else if (userInfo.old_password.length < 4) {
        setMessage("Old password must be at least 4 characters long");
      } else if (userInfo.new_password.length < 4) {
        setMessage("New password must be at least 4 characters long");
      } else {
        setMessage("'New Password' and 'Confirm Password' fields don't match");
      }

      setOpenSnackbar(true);
      setChangePswd(false);
      clearFields();
    }
  }

  // Delete user account, clear `localStorage` and redirect to `/home`
  function deleteAccount() {
    axios.delete("/api/settings").then((response) => {
      return;
    });

    axios
      .get("/api/auth/logout")
      .then((response) => {
        const { user, isAuthenticated } = response.data;

        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // HANDLE SNACKBAR
  function handleClose(event, reason) {
    setOpenConfirmation(false);
    setOpenSnackbar(false);

    if (reason === "clickaway") {
      return;
    }
  }

  return (
    <CustomCard
      title="Settings"
      content={
        <div style={{ textAlign: "left" }}>
          <Typography sx={{ mb: 2 }}>Personal Info</Typography>
          <Grid container spacing={2}>
            {/* USER FIELDS */}
            <Grid item md={matches ? 4 : 5} lg={3}>
              <TextField
                disabled={!editInfo}
                autoComplete="off"
                label="First Name"
                name="first_name"
                variant="outlined"
                value={userInfo.first_name}
                onChange={handleInfo}
              />
            </Grid>
            <Grid item md={7} lg={9}>
              <TextField
                disabled={!editInfo}
                autoComplete="off"
                label="Last Name"
                name="last_name"
                variant="outlined"
                value={userInfo.last_name}
                onChange={handleInfo}
              />
            </Grid>
            <Grid item xs={matches ? 4 : 12}>
              <TextField
                sx={{ width: matchesLg ? "248px" : "auto" }}
                disabled={!editInfo}
                autoComplete="off"
                label="E-mail Address"
                name="email"
                variant="outlined"
                value={userInfo.email}
                onChange={handleInfo}
              />
            </Grid>

            {/* BUTTONS */}
            <Grid item xs={12}>
              {editInfo ? (
                <DualButton
                  firstButtonAction={() => setEditInfo(false)}
                  firstButtonText="Cancel"
                  secondButtonAction={handleSubmitInfo}
                  secondButtonText="Save"
                />
              ) : (
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => {
                    setEditInfo(true);
                  }}
                >
                  Edit Info
                </Button>
              )}
            </Grid>

            {/* PASSWORD FIELDS */}
            <Grid item xs={12}>
              <Typography sx={{ mt: 3, mb: 2 }}>Password</Typography>
              <TextField
                sx={{ width: matchesLg ? "248px" : "auto" }}
                disabled={!changePswd}
                autoComplete="off"
                label="Old Password"
                name="old_password"
                type="password"
                variant="outlined"
                value={userInfo.old_password}
                onChange={handleInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: matchesLg ? "248px" : "auto" }}
                disabled={!changePswd}
                autoComplete="off"
                label="New Password"
                name="new_password"
                type="password"
                variant="outlined"
                value={userInfo.new_password}
                onChange={handleInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: matchesLg ? "248px" : "auto" }}
                disabled={!changePswd}
                autoComplete="off"
                label="Confirm Password"
                name="confirm_password"
                type="password"
                variant="outlined"
                value={userInfo.confirm_password}
                onChange={handleInfo}
              />
            </Grid>

            {/* BUTTONS */}
            <Grid item xs={12}>
              {changePswd ? (
                <DualButton
                  firstButtonAction={() => {
                    setEditInfo(false);
                    clearFields();
                  }}
                  firstButtonText="Cancel"
                  secondButtonAction={handleSubmitPswd}
                  secondButtonText="Save"
                />
              ) : (
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => {
                    setChangePswd(true);
                  }}
                >
                  Change Password
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: 5 }}
                variant="outlined"
                color="error"
                onClick={() => {
                  setOpenConfirmation(true);
                }}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>

          {/* DIALOG - DELETE CONFIRMATION */}
          <ConfirmationDialog
            isOpen={openConfirmation}
            onClose={handleClose}
            title="Confirm account deletion?"
            message={
              "All your data will be removed. This action cannot be undone."
            }
            confirmButton="The End"
            onConfirm={deleteAccount}
          />

          {/* SNACKBAR */}
          <CustomSnackbar
            open={openSnackbar}
            close={handleClose}
            severity={severity}
            message={message}
          />
        </div>
      }
    />
  );
}

export default Settings;
