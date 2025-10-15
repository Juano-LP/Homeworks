import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stack: []
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.stack = action.payload;
    },
    pushNotification(state, action) {
      state.stack.push(action.payload);
    },
    popNotification(state) {
      state.stack.pop();
    },
    clearNotifications(state) {
      state.stack = [];
    }
  }
});

export const { setNotifications, pushNotification, popNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
