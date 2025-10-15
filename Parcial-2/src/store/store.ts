import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import dmQueueReducer from "./slices/dmQueueSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    dmQueue: dmQueueReducer,
  },
});

export default store;


