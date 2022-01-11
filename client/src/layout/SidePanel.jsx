import Drawer from "@mui/material/Drawer";
import CustomNavBar from "../components/CustomNavBar";

function SidePanel(props) {
  return (
    <div>
      {/* PERMANENT DRAWER */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", xl: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        <CustomNavBar />
      </Drawer>

      {/* TEMPORARY DRAWER */}
      <Drawer
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", xl: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
        open={props.open}
        onClose={props.toggle}
      >
        <CustomNavBar onClose={props.toggle} />
      </Drawer>
    </div>
  );
}

export default SidePanel;
