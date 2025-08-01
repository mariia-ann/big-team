import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthor, fetchAuthors, fetchTopAuthors } from "./operations.js";

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
    topItems: [],
    currentCreator: null,
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

      .addCase(fetchTopAuthors.pending, handlePending)
      .addCase(fetchTopAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.topItems = action.payload;
      })
      .addCase(fetchTopAuthors.rejected, handleRejected)

      .addCase(fetchAuthor.pending, handlePending)
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCreator = action.payload;
      })
      .addCase(fetchAuthor.rejected, handleRejected);
  },
});

export const authorReducer = slice.reducer;
