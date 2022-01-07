import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./routes/Router.jsx";
import Footer from "./layout/Footer";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00D67E",
    },
    secondary: {
      main: "#d81b60",
    },
    background: {
      paper: "#3c4250",
      default: "#31313d",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Open Sans"].join(","),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fieldset: {
            borderColor: "grey",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
