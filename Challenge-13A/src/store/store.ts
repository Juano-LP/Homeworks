import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { chatSlice } from "./slices/chatSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
});