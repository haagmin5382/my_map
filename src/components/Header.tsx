import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { Link } from "react-router-dom";
import { authService } from "fbase";
import { userReducer } from "redux/user";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./modal/SuccessModal";
import AlertModal from "./modal/AlertModal";
import { reduxStateType } from "./Main";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const userState = useSelector((state: reduxStateType) => state.user.value);

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
  const loginOrLogOut = async () => {
    if (userState.email) {
      await clickLogOut();
      navigate("/");
      dispatch(
        openAndClose({
          ...modalState,
          alertModal: null,
          successModal: "로그아웃 했습니다.",
        })
      );
    } else {
      navigate("/login");
    }
  };

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    setAnchorElUser(target);
  };
  return (
    <header>
      {modalState.successModal && <SuccessModal />}

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
              {modalState.menuModal ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightIcon />
              )}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
                My Map
              </Link>
            </Typography>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userState.photoURL ? (
                  <Avatar src={userState.photoURL} />
                ) : (
                  <Avatar alt="Remy Sharp" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userState.email && (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/place");
                  }}
                >
                  {userState.email ? "저장한 장소" : null}
                </MenuItem>
              )}
              {userState.email && (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/profile");
                  }}
                >
                  <Typography textAlign="center">
                    {userState.displayName
                      ? userState.displayName
                      : userState.email.split("@")[0]}
                    's profile
                  </Typography>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  loginOrLogOut();
                }}
              >
                <Typography textAlign="center">
                  {!userState.email ? "Login" : "Logout"}
                </Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
