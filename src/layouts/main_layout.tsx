import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../componets/header";
import Footer from "../componets/footer";
import { Box } from "@mui/material";

const MainLayout: React.FC = () => {
  return (
    <Box
      className="app-layout"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box component="main" className="content" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
export default MainLayout;
