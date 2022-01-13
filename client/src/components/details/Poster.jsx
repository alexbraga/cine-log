import useMediaQuery from "@mui/material/useMediaQuery";

function Poster(props) {
  const matches = useMediaQuery("(max-width:718px)");

  return (
    <img
      style={{
        width: matches ? "224px" : "208px",
        height: matches ? "336px" : "312px",
        margin: "10px 0",
      }}
      src={props.source}
      alt={props.altText}
    />
  );
}

export default Poster;
