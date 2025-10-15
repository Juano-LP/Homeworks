import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    clearPosts(state) {
      state.posts = [];
    },
  },
});

export const { setPosts, addPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
