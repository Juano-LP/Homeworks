
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stack: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.stack.push({
        id: Date.now(),
        message: action.payload.message,
        createdAt: action.payload.createdAt || Date.now(),
      });
    },
    popNotification: (state) => {
      state.stack.pop();
    },
    clearNotifications: (state) => {
      state.stack = [];
    },
    setNotifications: (state, action) => {
      state.stack = action.payload;
    },
  },
});

export const {
  addNotification,
  popNotification,
  clearNotifications,
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

