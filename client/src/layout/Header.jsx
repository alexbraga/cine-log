import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header() {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const isProduction = process.env.NODE_ENV === "production";

  const clientUrl = isProduction
    ? process.env.REACT_APP_CLIENT_URL_PROD
    : process.env.REACT_APP_CLIENT_URL_DEV;

  function handleChange(event) {
    setSearchInput(event.target.value);
  }

  // On pressing "Enter" key at search field, build search params and navigate to the newly created URL
  function keyPress(event) {
    const url = new URL(`${clientUrl}/results`);

    url.search = new URLSearchParams({ query: event.target.value, page: 1 });

    const query = url.search.toString();

    if (event.key === "Enter" && searchInput !== "") {
      navigate({
        pathname: `/results${query}`,
      });

      setSearchInput("");
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            color: "#e0e0e0",
            backgroundColor: "#31313d",
          }}
        >
          <Toolbar>
            <div style={{ margin: "auto" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  name="search"
                  placeholder="Search movie…"
                  inputProps={{ "aria-label": "search" }}
                  autoComplete="off"
                  value={searchInput}
                  onChange={handleChange}
                  onKeyDown={(event) => keyPress(event)}
                />
              </Search>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
