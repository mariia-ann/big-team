import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthors } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};


const slice = createSlice({
  name: "authors",
   initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, handlePending)
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchAuthors.rejected, handleRejected)
  },
});

export const authorReducer = slice.reducer;