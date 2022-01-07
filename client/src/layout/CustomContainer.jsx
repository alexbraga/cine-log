import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CustomContainer(props) {
  return (
    <Container
      className="layout"
      component="main"
      maxWidth="xs"
      style={{ width: "360px" }}
    >
      <div>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            {props.title}
          </Typography>
        </Box>
        {props.content}
      </div>
    </Container>
  );
}

export default CustomContainer;
