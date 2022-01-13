import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";

function EditDialog(props) {
  const [entryData, setEntryData] = useState({
    date: props.date,
    rating: props.rating,
    review: props.review,
  });

  function handleDate(date) {
    setEntryData((prevValue) => {
      return {
        ...prevValue,
        date: date.toISOString(),
      };
    });
  }

  function handleRating(event, value) {
    setEntryData((prevValue) => {
      return {
        ...prevValue,
        rating: value,
      };
    });
  }

  function handleReview(event) {
    const { value } = event.target;

    setEntryData((prevValue) => {
      return {
        ...prevValue,
        review: value,
      };
    });
  }

  return (
    <Dialog
      sx={{ backdropFilter: "blur(2px)" }}
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{"Edit entry"}</DialogTitle>

      {/* DATE */}
      <DialogContent style={{ paddingTop: "20px" }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            label="Watched on"
            inputFormat="MMM dd, yyyy"
            disableMaskedInput={true}
            name="date"
            value={entryData.date}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* RATING */}
        <Typography sx={{ mt: 2 }}>Rating:</Typography>
        <Rating
          sx={{ mb: 2 }}
          name="rating"
          value={entryData.rating}
          emptyIcon={<StarIcon />}
          onChange={handleRating}
        />

        {/* REVIEW */}
        <Typography>Review:</Typography>
        <TextareaAutosize
          name="review"
          value={entryData.review}
          aria-label="empty textarea"
          placeholder="Add your review..."
          minRows={3}
          style={{ width: "100%", resize: "none", overflow: "auto" }}
          onChange={handleReview}
        />
      </DialogContent>

      {/* BUTTONS */}
      <DialogActions sx={{ mr: 2, mb: 1 }}>
        <Button
          sx={{ mr: 1 }}
          onClick={() => {
            setEntryData({
              date: props.date,
              rating: props.rating,
              review: props.review,
            });

            props.onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const updateInfo = {
              movieId: props.movieId,
              date: entryData.date,
              rating: entryData.rating,
              review: entryData.review,
            };

            props.onUpdate(props.id, updateInfo);
            props.onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
