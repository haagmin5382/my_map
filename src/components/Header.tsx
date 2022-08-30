import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { Link } from "react-router-dom";

const Header = () => {
  interface reduxStateType {
    modal: {
      value: {
        menuModal: boolean;
        alertModal: boolean;
      };
    };
  }

  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);

  const controlModal = (modalName: keyof typeof modalState) => {
    dispatch(
      openAndClose({ ...modalState, [modalName]: !modalState[modalName] })
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
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                Login
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
