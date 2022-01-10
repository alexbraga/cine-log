import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

function ResultItem(props) {
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:767px)");

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton alignItems="flex-start" sx={{ pl: 0, pt: 2 }}>
          <div>
            <img
              src={props.imgURL}
              alt={`${props.title} poster`}
              style={
                matches
                  ? { width: "80px", height: "120px" }
                  : { width: "154px", height: "231px" }
              }
            />
          </div>
          <ListItemText
            sx={{ ml: 3 }}
            primary={props.title}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2">
                  {props.year.slice(0, 4)}
                </Typography>
                <br />
                <br />
                {matches ? null : (
                  <span style={{ textAlign: "justify" }}>{props.synopsis}</span>
                )}
              </React.Fragment>
            }
            onClick={() => navigate(`/details/${props.id}`)}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
}

export default ResultItem;
