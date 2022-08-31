import React from "react";
import Header from "components/Header";
import Main from "components/Main";
import SignIn from "pages/user/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "pages/user/SignUp";
import Profile from "pages/user/Profile";
import { useEffect } from "react";
import { authService } from "fbase";
import { userReducer } from "redux/user";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      dispatch(
        userReducer({
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          uid: user?.uid,
        })
      );
    }); // 사용자 로그인 상태의 변화를 관찰한다.
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
