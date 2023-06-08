import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <>
      {/* globalLoading */}
      <GlobalLoading />
      {/* globalLoading */}

      {/* login modal */}
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar></Topbar>
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet></Outlet>
          {/* main */}
        </Box>
      </Box>

      {/* footer */}
      <Footer></Footer>
      {/* footer */}
    </>
  );
};

export default MainLayout;
