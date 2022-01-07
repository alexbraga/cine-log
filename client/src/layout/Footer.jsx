import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <div className="footer">
      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
        ©{new Date().getFullYear()} Movie.log - Movie data from{" "}
        <Link
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            textDecorationColor: "rgba(255, 255, 255, 0.5)",
            "&:hover": { color: "rgba(255, 255, 255, 0.8)" },
          }}
          href="https://www.themoviedb.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          TMDb
        </Link>
      </Typography>
    </div>
  );
}

export default Footer;
