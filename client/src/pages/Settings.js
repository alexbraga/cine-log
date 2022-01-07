import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CustomCard from "../layout/CustomCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomSnackbar from "../components/CustomSnackbar";
import DeleteDialog from "../components/DeleteDialog";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const authContext = useContext(AuthContext);

  // GET USER INFO
  useEffect(() => {
    axios
      .get("/settings")
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
      .patch("/settings/user", userInfo)
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
      userInfo.old_password.length > 0 &&
      userInfo.new_password.length > 0 &&
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
  function handleSubmitPswd() {
    if (validateForm()) {
      axios
        .patch("/settings/password", {
          old_password: userInfo.old_password,
          password: userInfo.new_password,
        })
        .then((response) => {
          setMessage(response.data.message);
          setSeverity("success");
          setOpenSnackbar(true);
          setChangePswd(false);
          clearFields();
        })
        .catch((error) => {
          setMessage("Incorrect 'Old Password'");
          setSeverity("error");
          setOpenSnackbar(true);
          setChangePswd(false);
          clearFields();
        });
    } else {
      setMessage("'New Password' and 'Confirm Password' fields don't match");
      setSeverity("error");
      setOpenSnackbar(true);
      setChangePswd(false);
      clearFields();
    }
  }

  // Delete user account, clear `localStorage` and redirect to `/home`
  function deleteAccount() {
    axios
      .create()
      .delete("/settings")
      .then((response) => {
        return;
      });

    axios
      .create()
      .get("/auth/logout")
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
    setOpenDeleteDialog(false);
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
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
            <Grid item xs={12}>
              <TextField
                disabled={!editInfo}
                sx={{ width: "336px" }}
                autoComplete="off"
                label="E-mail Address"
                name="email"
                variant="outlined"
                value={userInfo.email}
                onChange={handleInfo}
              />
            </Grid>

            {/* BUTTONS */}
            <Grid item>
              {editInfo ? (
                <div>
                  <Button
                    sx={{ mt: 2, mr: 1 }}
                    variant="outlined"
                    onClick={() => {
                      setEditInfo(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={handleSubmitInfo}
                  >
                    Save
                  </Button>
                </div>
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
                disabled={!changePswd}
                sx={{ width: "336px" }}
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
                disabled={!changePswd}
                sx={{ width: "336px" }}
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
                disabled={!changePswd}
                sx={{ width: "336px" }}
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
                <div>
                  <Button
                    sx={{ mt: 2, mr: 1 }}
                    variant="outlined"
                    onClick={() => {
                      setChangePswd(false);
                      clearFields();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={handleSubmitPswd}
                  >
                    Save
                  </Button>
                </div>
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
                  setOpenDeleteDialog(true);
                }}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>

          {/* DIALOG - DELETE CONFIRMATION */}
          <DeleteDialog
            isOpen={openDeleteDialog}
            onClose={handleClose}
            title="Confirm account deletion?"
            message={
              "All your data will be removed. This action cannot be undone."
            }
            onRemove={deleteAccount}
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
