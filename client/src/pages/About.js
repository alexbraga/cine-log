import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CustomCard from "../layout/CustomCard";

function About() {
  return (
    <CustomCard
      title={"About"}
      content={
        <Typography align="justify">
          Hello there!
          <br />
          <br />
          This is my very first personal project and it was born out of my love
          for cinema and the desire to keep track of watched films alongside
          with other records in a simple and lightweight Web App.
          <br />
          <br />
          Cine.log is built with MERN stack, and all movie data is provided by{" "}
          <Link
            href="https://www.themoviedb.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            TMDb
          </Link>
          . The source code is available at{" "}
          <Link
            href="https://github.com/alexbraga/cine-log"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
          <br />
          <br />
          <Typography align="left">
            Feel free to reach me at{" "}
            <Link
              href="mailto:contato@alexbraga.com.br"
              rel="noopener noreferrer"
              target="_blank"
              sx={{ fontStyle: "italic" }}
            >
              contato@alexbraga.com.br
            </Link>
            .
          </Typography>
        </Typography>
      }
    />
  );
}

export default About;
