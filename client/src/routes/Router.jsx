import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Results from "../pages/Results";
import Settings from "../pages/Settings";
import SessionExpired from "../pages/Error";
import Layout from "../layout/Layout";
import PrivateOutlet from "../hoc/PrivateOutlet";
import PublicRoute from "../hoc/PublicRoute";
import Recover from "../pages/Recover";
import Reset from "../pages/Reset";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/reset/:token" element={<Reset />} />
        </Route>

        <Route element={<PrivateOutlet />}>
          <Route element={<Layout />}>
            <Route path="/diary" element={<Diary />} />
            <Route path="/results" element={<Results />} />
            <Route path="/details/:movieId" element={<Details />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<SessionExpired />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
