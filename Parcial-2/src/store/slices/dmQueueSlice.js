import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
};

const dmQueueSlice = createSlice({
  name: "dmQueue",
  initialState,
  reducers: {
    setQueue(state, action) {
      state.queue = action.payload;
    },
    enqueueMessage(state, action) {
      state.queue.push(action.payload);
    },
    dequeueMessage(state) {
      state.queue.shift();
    },
    clearQueue(state) {
      state.queue = [];
    },
  },
});

export const { setQueue, enqueueMessage, dequeueMessage, clearQueue } =
  dmQueueSlice.actions;

export default dmQueueSlice.reducer;


