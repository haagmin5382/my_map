import React, { useEffect, useState } from "react";
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
import GoogleIcon from "@mui/icons-material/Google";
import AlertModal from "components/alert/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { reduxStateType } from "components/Main";
import { openAndClose } from "redux/modal";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const [user, setUser] = useState({ email: "", password: "" });

  const fillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = getAuth();
    if (user.email === "") {
      dispatch(
        openAndClose({ ...modalState, alertModal: "이메일을 입력하세요" })
      );
    } else if (user.password === "") {
      dispatch(
        openAndClose({ ...modalState, alertModal: "비밀번호를 입력하세요" })
      );
    } else {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => navigate("/"))
        .catch((error) => {
          console.log(error.message);
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            dispatch(
              openAndClose({ ...modalState, alertModal: "아이디가 없습니다." })
            );
          } else {
            dispatch(
              openAndClose({
                ...modalState,
                alertModal: "비밀번호가 다릅니다.",
              })
            );
          }
        });
    }
  };

  const socialLogin = async (e: React.MouseEvent<HTMLElement>) => {
    let provider;
    const evnetTarget = e.target as HTMLButtonElement;

    if (evnetTarget.name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
      navigate("/");
      dispatch(
        openAndClose({
          ...modalState,
          alertModal: null,
          successModal: "로그인에 성공했습니다.",
        })
      );
    }
  };

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
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              onChange={fillInput}
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={fillInput}
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Button
              name="google"
              fullWidth
              variant="contained"
              sx={{
                mt: 0,
                mb: 2,
                color: "#ffffff",
                backgroundColor: "#C0BABA",
              }}
              onClick={socialLogin}
            >
              <GoogleIcon style={{ marginRight: "1vw" }} /> Google 로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
