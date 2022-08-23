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

const Header = () => {
  interface reduxStateType {
    modal: {
      value: {
        menuModal: boolean;
      };
    };
  }
  const dispatch = useDispatch();
  const modalState = useSelector(
    (state: reduxStateType) => state.modal.value.menuModal
  );

  const controlModal = () => {
    dispatch(openAndClose({ menuModal: !modalState }));
  };
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={controlModal}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Map
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
