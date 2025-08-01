import { createSlice } from "@reduxjs/toolkit";
import { addArticle, fetchArticle, fetchArticles } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    currentArticle: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, handlePending)
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, handleRejected)

      .addCase(fetchArticle.pending, handlePending)
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticle.rejected, handleRejected)
      
      .addCase(addArticle.pending, handlePending)
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addArticle.rejected, handleRejected)
  },
});

export const articlesReducer = slice.reducer;
