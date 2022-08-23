import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import searchReducer from "./locationSearch";

export default configureStore({
  reducer: {
    modal: modalReducer,
    search: searchReducer,
  },
});
