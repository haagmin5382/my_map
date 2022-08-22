import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
