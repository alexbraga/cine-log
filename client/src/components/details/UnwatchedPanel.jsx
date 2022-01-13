import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function UnwatchedPanel(props) {
  const navigate = useNavigate();

  return (
    <Card sx={{ padding: 3, margin: 2 }}>
      <CardContent>
        <Grid container sx={{ mb: 2 }}>
          {/* DATE PICKER */}
          <Grid item md={12}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                label="Watched on"
                inputFormat="MMM dd, yyyy"
                disableMaskedInput={true}
                name="date"
                value={props.date}
                onChange={props.onDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* RATING */}
        <Typography>Rating:</Typography>
        <Rating
          sx={{ mb: 2 }}
          name="rating"
          value={props.rating}
          emptyIcon={<StarIcon />}
          onChange={props.onRatingChange}
        />

        {/* REVIEW */}
        <Typography>Review:</Typography>
        <TextareaAutosize
          name="review"
          value={props.review}
          aria-label="empty textarea"
          placeholder="Add your review..."
          minRows={3}
          style={{ width: "100%", resize: "none" }}
          onChange={props.onReviewChange}
        />

        {/* VIEW COUNT */}
        {props.view_count === null ? (
          <Typography sx={{ mt: 2, mb: 2 }}>
            {" "}
            You haven't watched this movie yet
          </Typography>
        ) : (
          <Typography sx={{ mt: 2, mb: 2 }}>
            {" "}
            View count: {props.view_count}
          </Typography>
        )}

        {/* BUTTONS */}
        <Button
          sx={{ mt: 2, mr: 1 }}
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button sx={{ mt: 2 }} variant="contained" onClick={props.onClick}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
}

export default UnwatchedPanel;
