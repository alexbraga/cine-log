import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextArea from "../details/TextArea";
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Watched on"
            format="MMMM D, YYYY"
            disableMaskedInput={true}
            name="date"
            value={dayjs(entryData.date)}
            onChange={handleDate}
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
        <TextArea
          value={entryData.review}
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
