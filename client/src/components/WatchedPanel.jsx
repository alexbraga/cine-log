import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";
import usePersistedState from "../hooks/usePersistedState";

function WatchedPanel(props) {
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("success");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alert, setAlert] = usePersistedState(true, "edit_panel:info_alert");

  const [userData, setUserData] = useState({
    rating: null,
    review: "",
  });

  // Control value on Rating selector and set it to `userData.rating`
  function handleRating(event, value) {
    setUserData((prevValue) => {
      return {
        ...prevValue,
        rating: value,
      };
    });
  }

  // Control value on Text Area and set it to `userData.review`
  function handleReview(event) {
    const { value } = event.target;

    setUserData((prevValue) => {
      return {
        ...prevValue,
        review: value,
      };
    });
  }

  // Update rating/review and display feedback message
  function onUpdate(event) {
    event.preventDefault();
    const url = new URL(window.location.href);

    axios
      .patch(`/api${url.pathname}`, { rating: userData.rating, review: userData.review })
      .then((res) => {
        setMessage(res.data.message);
        setSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        setMessage("Something went wrong. Please, try again.");
        setSeverity("error");
        setOpenSnackbar(true);
      });
  }

  // HANDLE SNACKBAR
  function handleClose(event, reason) {
    setOpen(false);
    setOpenSnackbar(false);

    if (reason === "clickaway") {
      return;
    }
  }

  return (
    <Card sx={{ padding: 3, margin: 2 }}>
      <CardContent>
        {/* RATING */}
        <Typography>Rating:</Typography>
        {edit ? (
          <Rating
            sx={{ mb: 2 }}
            name="rating"
            value={userData.rating}
            emptyIcon={<StarIcon />}
            onChange={handleRating}
          />
        ) : (
          <Rating
            sx={{ mb: 2 }}
            name="rating"
            readOnly
            value={props.rating}
            emptyIcon={<StarIcon />}
          />
        )}

        {/* REVIEW */}
        {edit ? (
          <div>
            <Typography>Review:</Typography>
            <TextareaAutosize
              name="review"
              value={userData.review}
              aria-label="textarea"
              placeholder="Add your review..."
              minRows={3}
              style={{ width: "100%", resize: "none", overflow: "auto" }}
              onChange={handleReview}
            />
          </div>
        ) : props.review === "" ? (
          <Typography sx={{ mb: 2 }}>
            You haven't written a review yet.
          </Typography>
        ) : (
          <div>
            <Typography>Review:</Typography>
            <Typography sx={{ mb: 2, fontStyle: "italic" }} align="justify">
              {props.review}
            </Typography>
          </div>
        )}

        {/* VIEW COUNT */}
        {props.view_count === 0 ? (
          <Typography sx={{ mb: 2, mt: 2 }}>
            {" "}
            This movie isn't logged on your diary.
          </Typography>
        ) : (
          <Typography sx={{ mb: 2, mt: 2 }}>
            {" "}
            View count: {props.view_count}
          </Typography>
        )}

        {/* BUTTONS */}
        {edit ? (
          <div>
            <Button
              sx={{ mt: 2, mr: 1 }}
              variant="outlined"
              onClick={() => {
                setEdit(false);
                setUserData({
                  rating: props.rating,
                  review: props.review,
                });
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={(event) => {
                onUpdate(event);
                props.onSaveChanges();
                setEdit(false);
              }}
            >
              Save
            </Button>
            {alert ? (
              <Alert
                sx={{ mt: 4 }}
                severity="info"
                onClose={() => {
                  setAlert(false);
                }}
              >
                To modify the watched date, go to Diary and click on the pencil{" "}
                <span>
                  (<EditIcon />)
                </span>{" "}
                icon for the entry you want to change.
              </Alert>
            ) : null}
          </div>
        ) : (
          <div>
            <Button
              sx={{ mt: 2, mr: 1 }}
              variant="outlined"
              onClick={() => {
                setEdit(true);
                setUserData({
                  rating: props.rating,
                  review: props.review,
                });
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Log Again
            </Button>
          </div>
        )}

        {/* DIALOG - LOG MOVIE AGAIN */}
        <Dialog
          sx={{ backdropFilter: "blur(2px)" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Choose a date</DialogTitle>
          <DialogContent style={{ paddingTop: "20px" }}>
            {/* DATE PICKER */}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Watched on"
                inputFormat="MMM dd, yyyy"
                disableMaskedInput={true}
                name="date"
                value={props.date}
                onChange={props.onDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>

          {/* BUTTONS */}
          <DialogActions sx={{ mr: 2, mb: 1 }}>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" onClick={props.onSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* SNACKBAR */}
        <CustomSnackbar
          open={openSnackbar}
          close={handleClose}
          isError={severity}
          message={message}
        />
      </CardContent>
    </Card>
  );
}

export default WatchedPanel;
