import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import { InfoOutlined, ListAlt } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import ConfirmationDialog from "./dialogs/ConfirmationDialog";

const buttonHover = {
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

function CustomNavBar(props) {
  const isProduction = process.env.NODE_ENV === "production";

  const serverUrl = isProduction
    ? process.env.REACT_APP_SERVER_URL_PROD
    : process.env.REACT_APP_SERVER_URL_DEV;

  const authContext = useContext(AuthContext);
  const matches = useMediaQuery("(max-width:1535px)");

  const menu = [
    {
      text: "Diary",
      icon: <ListAlt color="primary" />,
      path: "/diary",
    },
    {
      text: "Settings",
      icon: <SettingsIcon color="primary" />,
      path: "/settings",
    },
    {
      text: "About",
      icon: <InfoOutlined color="primary" />,
      path: "/about",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState("");

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const navigate = useNavigate();

  function handleClick(event, index) {
    setSelectedIndex(index);
  }

  function handleLogout() {
    axios
      .create()
      .get(`${serverUrl}/api/auth/logout`)
      .then((response) => {
        const { user, isAuthenticated } = response.data;

        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <Typography variant="h5" sx={{ m: 2 }}>
          Cine.log
        </Typography>
      </div>
      <div>
        <Typography variant="h6" sx={{ m: 2 }}>
          Welcome, {authContext.user}!
        </Typography>
      </div>
      <List>
        {menu.map((item, index) => {
          return (
            <ListItemButton
              sx={buttonHover}
              key={item.text}
              selected={selectedIndex === index}
              onClick={(event) => {
                navigate(item.path);
                handleClick(event, index);
                matches && props.onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ ml: -2 }} />
            </ListItemButton>
          );
        })}

        <ListItemButton
          sx={buttonHover}
          key="Logout"
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ ml: -2 }} />
        </ListItemButton>
      </List>

      {/* DIALOG - LOGOUT CONFIRMATION */}
      <ConfirmationDialog
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        message={"Are you sure you want to exit?"}
        confirmButton="Exit"
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default CustomNavBar;
