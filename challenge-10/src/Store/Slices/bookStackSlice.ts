import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [
        { name: "Introduction to Algorithms", ISBN: "9780262033848", author: "Thomas H. Cormen", editorial: "MIT Press" },
        { name: "Design Patterns", ISBN: "9780201633610", author: "Erich Gamma", editorial: "Addison-Wesley" },
        { name: "Structure and Interpretation of Computer Programs", ISBN: "9780262510875", author: "Harold Abelson", editorial: "MIT Press" },
    ]
};

const bookStackSlice = createSlice({
  name: 'bookStack',
  initialState,
  reducers: {
    pushBook: (state, action) => {
      state.books.push(action.payload); 
    },
  }
});

export const { pushBook } = bookStackSlice.actions;

export default bookStackSlice.reducer;