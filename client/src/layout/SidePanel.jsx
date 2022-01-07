import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
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

const buttonHover = {
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

function SidePanel() {
  const authContext = useContext(AuthContext);

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

  const navigate = useNavigate();

  function handleClick(event, index) {
    setSelectedIndex(index);
  }

  function handleLogout() {
    axios
      .create()
      .get("/auth/logout")
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
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
      }}
    >
      <div>
        <Typography variant="h5" sx={{ m: 2 }}>
          Movie.log
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
          onClick={(event) => {
            handleLogout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ ml: -2 }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SidePanel;
