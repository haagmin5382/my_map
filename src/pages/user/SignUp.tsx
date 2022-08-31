import react, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { reduxStateType } from "components/Main";
import { openAndClose } from "redux/modal";
import AlertModal from "components/alert/AlertModal";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import React from "react";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
  });

  const fillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setNewUser({ ...newUser, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth();

    if (
      !(
        newUser.email &&
        newUser.password &&
        newUser.passwordCheck &&
        newUser.displayName
      )
    ) {
      dispatch(
        openAndClose({ ...modalState, alertModal: "모든 값은 필수입니다." })
      );
    } else if (newUser.password !== newUser.passwordCheck) {
      dispatch(
        openAndClose({ ...modalState, alertModal: "비밀번호가 다릅니다." })
      );
    } else {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
        .then(() => navigate("/"))
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            dispatch(
              openAndClose({
                ...modalState,
                alertModal: "이미 있는 이메일입니다.",
              })
            );
          }
        });
    }
  };

  useEffect(() => {
    if (modalState.alertModal) {
      // modalState.alertModal이 null이 아닌 경우에만 실행시켜야한다.
      setTimeout(() => {
        dispatch(openAndClose({ ...modalState, alertModal: null }));
      }, 5000);
    }
  }, [modalState.alertModal]);

  return (
    <ThemeProvider theme={theme}>
      {modalState.alertModal && <AlertModal />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원 가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="displayName"
                  required
                  fullWidth
                  id="displayName"
                  label="닉네임"
                  autoFocus
                  onChange={fillInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={fillInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={fillInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordCheck"
                  label="비밀번호 확인"
                  type="password"
                  id="passwordCheck"
                  autoComplete="passwordCheck"
                  onChange={fillInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원 가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 회원이신가요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
