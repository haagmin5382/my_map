import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { Link } from "react-router-dom";
import { authService } from "fbase";
import { userReducer } from "redux/user";

const Header = () => {
  interface reduxStateType {
    modal: {
      value: {
        menuModal: boolean;
        alertModal: boolean;
      };
    };
  }
  interface userType {
    user: {
      value: {
        email: string;
        displayName: string;
        photoURL: string;
        uid: string;
      };
    };
  }

  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const userState = useSelector((state: userType) => state.user.value);

  const controlModal = (modalName: keyof typeof modalState) => {
    dispatch(
      openAndClose({ ...modalState, [modalName]: !modalState[modalName] })
    );
  };

  const clickLogOut = () => {
    authService.signOut();
    dispatch(
      userReducer({
        email: "",
        displayName: "",
        photoURL: "",
        uid: "",
      })
    );
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ height: "8vh" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => controlModal("menuModal")}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
                My Map
              </Link>
            </Typography>
            <Button color="inherit">
              <Badge badgeContent={1} color="success">
                <Link
                  to="/mail"
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    marginTop: "10%",
                  }}
                >
                  <MailIcon color="action" />
                </Link>
              </Badge>
            </Button>
            <Button color="inherit">
              {userState.email && (
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    marginRight: "2vw",
                  }}
                >
                  {userState.displayName
                    ? userState.displayName
                    : userState.email.split("@")[0]}
                  의 프로필
                </Link>
              )}
            </Button>
            <Button color="inherit">
              {!userState.email ? (
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#ffffff" }}
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#ffffff" }}
                  onClick={clickLogOut}
                >
                  Logout
                </Link>
              )}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
