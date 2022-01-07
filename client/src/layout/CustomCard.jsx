import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CustomCard(props) {
  return (
    <Container component="main" maxWidth="lg">
      <Card sx={{ padding: 3, margin: 2 }}>
        <CardContent>
          <Typography variant="h5">{props.title}</Typography>
        </CardContent>
        <CardContent>{props.content}</CardContent>
      </Card>
    </Container>
  );
}

export default CustomCard;
