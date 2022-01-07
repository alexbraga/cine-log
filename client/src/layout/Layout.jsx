import React from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "./SidePanel";
import Header from "./Header";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <SidePanel />
      <div className="main" style={{ marginTop: "100px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
