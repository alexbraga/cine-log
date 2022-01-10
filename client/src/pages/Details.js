import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UnwatchedPanel from "../components/UnwatchedPanel";
import WatchedPanel from "../components/WatchedPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Credits from "../components/Credits";
import Poster from "../components/Poster";
import {
  getCast,
  getDirector,
  getGenres,
  getYear,
} from "../utils/getMovieDetails";

function Details() {
  const matches = useMediaQuery("(max-width:718px)");

  const myRef = useRef(null);

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    tmdbDetails: { genres: [] },
    tmdbCredits: { cast: [], crew: [] },
    userData: { rating: null, review: "", view_count: null },
  });

  const [show, setShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  //  GET MOVIE DETAILS AND USER LOGGED DATA
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    const url = new URL(window.location.href);

    axios
      .get(`/api${url.pathname}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdated]);

  const baseURL = "https://image.tmdb.org/t/p/w342";
  const placeholderImg =
    "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg";

  // Expand movie details
  function handleExpand() {
    setShow(!show);
    myRef.current.scrollIntoView({ behavior: "smooth" });
  }

  // ENTRY DATA
  const [userData, setUserData] = useState({
    rating: null,
    review: "",
    date: new Date(),
  });

  // New object passing user data and movie data to be saved on database
  const entryData = {
    ...userData,
    title: details.tmdbDetails.title,
    year: getYear(details),
    director: getDirector(details),
    genres: getGenres(details),
    runtime: details.tmdbDetails.runtime,
  };

  // Control value on Date Picker and set it to `userData.date`
  function handleDate(date) {
    setUserData((prevValue) => {
      return {
        ...prevValue,
        date: date.toISOString(),
      };
    });
  }

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

  // Submit entry to database and navigate to Diary
  function onSubmit(event) {
    event.preventDefault();
    const url = new URL(window.location.href);

    axios.post(`/api${url.pathname}`, entryData).then((res) => {
      navigate("/diary");
    });
  }

  // Function passed to the "WatchedPanel" component to be executed on saving changes after edit entry. It changes `isUpdated` state to force a re-render of `useEffect()` and update entry data on-screen
  function handleUpdateDetails() {
    setIsUpdated(!isUpdated);
  }

  return (
    <Container component="main" maxWidth="md">
      <Card sx={{ padding: matches ? 0 : 3, paddingBottom: 0, margin: 2 }}>
        <div style={{ textAlign: "right" }}>
          <IconButton
            aria-label="close"
            style={{ color: "#e0e0e0" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <CardContent>
          <Grid container alignItems="center">
            {/* MOVIE TITLE & YEAR */}
            <Grid item xs={12}>
              <Typography variant="h5">{details.tmdbDetails.title}</Typography>
              <Typography sx={{ mb: 2 }} variant="h6">
                ({getYear(details)})
              </Typography>
            </Grid>

            {/* MOVIE POSTER */}
            <Grid item xs={12} sm={matches ? 12 : 5} md={4}>
              <div style={{ textAlign: matches ? "center" : "left" }}>
                <Poster
                  source={
                    details.tmdbDetails.poster_path
                      ? baseURL + details.tmdbDetails.poster_path
                      : placeholderImg
                  }
                  altText={`${details.tmdbDetails.title} poster`}
                />
              </div>
            </Grid>

            {/* MOVIE DETAILS */}
            <Grid ref={myRef} item xs={12} sm={7} md={8}>
              <Collapse in={matches ? show : true}>
                <Credits
                  director={getDirector(details).join(", ")}
                  cast={getCast(details)}
                  genres={getGenres(details).join(", ")}
                  runtime={details.tmdbDetails.runtime}
                />
              </Collapse>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Collapse in={matches ? show : true}>
                <Typography style={{ fontWeight: "bold" }}>Synopsis</Typography>
                <Typography>{details.tmdbDetails.overview}</Typography>
              </Collapse>
            </Grid>

            {/* EXPAND SECTION BUTTON */}
            {matches ? (
              <Fab
                color="primary"
                size="small"
                aria-label="expand"
                sx={{ m: "auto", mt: 2 }}
                onClick={handleExpand}
              >
                {show ? <RemoveIcon /> : <AddIcon />}
              </Fab>
            ) : null}
          </Grid>
        </CardContent>
      </Card>

      {/* LOG MOVIE PANEL */}

      {details.userData === undefined ? (
        <UnwatchedPanel
          date={userData.date}
          onDateChange={handleDate}
          rating={userData.rating}
          onRatingChange={handleRating}
          review={userData.review}
          onReviewChange={handleReview}
          view_count={
            details.userData === undefined ? null : details.userData.view_count
          }
          onClick={onSubmit}
        />
      ) : (
        <WatchedPanel
          date={userData.date}
          onDateChange={handleDate}
          rating={details.userData.rating}
          review={details.userData.review}
          view_count={details.userData.view_count}
          onSubmit={onSubmit}
          onSaveChanges={handleUpdateDetails}
        />
      )}
    </Container>
  );
}

export default Details;
