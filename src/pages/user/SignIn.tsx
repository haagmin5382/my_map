import React, { useEffect } from "react";
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
import AlertModal from "components/alert/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { reduxStateType } from "components/Main";
import { openAndClose } from "redux/modal";
const theme = createTheme();

const SignIn = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "") {
      dispatch(
        openAndClose({ ...modalState, alertModal: "이메일을 입력하세요" })
      );
    } else if (data.get("password") === "") {
      dispatch(
        openAndClose({ ...modalState, alertModal: "비밀번호를 입력하세요" })
      );
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
