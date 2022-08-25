import React from "react";
import Header from "components/Header";
import Main from "components/Main";
import SignIn from "pages/user/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "pages/user/SignUp";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <LoadingSpinner /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
