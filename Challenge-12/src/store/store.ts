import { configureStore } from "@reduxjs/toolkit";
import firebaseReducer from "./slices/FirebaseSlice";

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
  },
});
