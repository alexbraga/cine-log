import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ResultItem from "../components/ResultItem";
import Pagination from "@mui/material/Pagination";
import CustomCard from "../layout/CustomCard";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

function Results() {
  const isProduction = process.env.NODE_ENV === "production";

  const serverUrl = isProduction
    ? process.env.REACT_APP_SERVER_URL_PROD
    : process.env.REACT_APP_SERVER_URL_DEV;

  const matches = useMediaQuery("(max-width:767px)");

  const navigate = useNavigate();

  const [details, setDetails] = useState({ results: [] });

  // Create a custom hook that binds to the `search` property from `location` url object
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery().toString();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // On successful response, assign the results to `results` array in `details` object
    axios
      .get(`${serverUrl}/api/results/${query}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const results = details.total_results;
  const pages = details.total_pages;
  const baseURL = "https://image.tmdb.org/t/p/w154";
  const placeholderImg =
    "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg";

  return (
    <CustomCard
      title="Results"
      content={
        <div>
          <Grid container>
            <Typography>{results ? results : 0} results found</Typography>
            <Grid item xs={12}>
              <List sx={{ mt: 3 }}>
                {details.results.map((result) => {
                  return (
                    <ResultItem
                      key={result.id}
                      id={result.id}
                      imgURL={
                        result.poster_path
                          ? baseURL + result.poster_path
                          : placeholderImg
                      }
                      title={result.title}
                      year={result.release_date}
                      synopsis={result.overview}
                    />
                  );
                })}
              </List>
            </Grid>
          </Grid>

          <Pagination
            sx={{ mt: 2 }}
            count={pages}
            siblingCount={matches ? 0 : 1}
            onChange={(event, page) => {
              const url = new URLSearchParams(window.location.search);
              url.set("page", page);
              const query = url.toString();

              navigate(`/results?${query}`);
            }}
          />
        </div>
      }
    />
  );
}

export default Results;
