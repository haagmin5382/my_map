import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import userReducer from "./user";
import searchPlace from "./getLocation";

export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    location: searchPlace,
  },
});
