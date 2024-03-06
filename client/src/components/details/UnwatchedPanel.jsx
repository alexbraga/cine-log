import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextArea from "../details/TextArea";
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Watched on"
                format="MMMM D, YYYY"
                disableMaskedInput={true}
                name="date"
                value={dayjs(props.date)}
                onChange={props.onDateChange}
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
        <TextArea
          value={props.review}
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
