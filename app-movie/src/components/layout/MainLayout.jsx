import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import AuthModal from "../common/AuthModal";
import userApi from "../../api/modules/user.api";
import favoriteApi from "./../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  // get user with JWT token
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);
  // get user with JWT token

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);

      if (user) getFavorites();
      if (!user) dispatch(setListFavorites([]));
    };
  }, [dispatch, user]);

  return (
    <>
      {/* globalLoading */}
      <GlobalLoading />
      {/* globalLoading */}

      {/* login modal */}
      <AuthModal />
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
