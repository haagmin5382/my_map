import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import userReducer from "./user";

export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});
