import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

function Credits(props) {
  const matches = useMediaQuery("(max-width:718px)");

  return (
    <div>
      {/* DIRECTOR(S) */}
      <Grid item>
        <Typography style={{ fontWeight: "bold" }}>Directed by:</Typography>
        <Typography sx={{ mb: 2 }}>{props.director}</Typography>

        {/* CAST */}
        <Typography style={{ fontWeight: "bold" }}>Cast:</Typography>
        <Typography sx={{ mb: 2 }} align={matches ? "left" : "justify"}>
          {props.cast}
        </Typography>

        {/* GENRE(S) */}
        <Typography style={{ fontWeight: "bold" }}>Genre(s):</Typography>
        <Typography sx={{ mb: 2 }}>{props.genres}</Typography>

        {/* RUNTIME */}
        <Typography style={{ fontWeight: "bold" }}>Runtime:</Typography>
        <Typography>{props.runtime} min</Typography>
      </Grid>
    </div>
  );
}

export default Credits;
