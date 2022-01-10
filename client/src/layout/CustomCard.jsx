import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

function CustomCard(props) {
  const matches = useMediaQuery("(max-width:767px)");

  return (
    <Container component="main" maxWidth="lg">
      <Card
        sx={matches ? { padding: 0, margin: 1 } : { padding: 3, margin: 2 }}
      >
        <CardContent>
          <Typography variant="h5">{props.title}</Typography>
        </CardContent>
        <CardContent>{props.content}</CardContent>
      </Card>
    </Container>
  );
}

export default CustomCard;
