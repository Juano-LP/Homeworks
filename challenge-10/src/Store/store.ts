import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice' 
import bookStackReducer from './Slices/bookStackSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        bookStack: bookStackReducer,
    },
});