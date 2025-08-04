import { createSlice } from "@reduxjs/toolkit";
import { addArticle, fetchArticle, fetchArticles, fetchArticlesByOwner } from "./operations.js";

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
    byOwner: {},
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

      .addCase(fetchArticlesByOwner.pending, handlePending)
      .addCase(fetchArticlesByOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { ownerId, articles } = action.payload;
        state.byOwner[ownerId] = articles;
      })
      .addCase(fetchArticlesByOwner.rejected, handleRejected);

      // .addCase(fetchArticlesByOwner.pending, (state, action) => {
      //   const ownerId = action.meta.arg;
      //   // Гарантуємо, що є об'єкт
      //   state.byOwner[ownerId] = state.byOwner[ownerId] || {
      //     items: [],
      //     isLoading: false,
      //     error: null,
      //   };
      //   state.byOwner[ownerId].isLoading = true;
      //   state.byOwner[ownerId].error = null;
      // })
      // .addCase(fetchArticlesByOwner.fulfilled, (state, action) => {
      //   const { ownerId, articles } = action.payload;
      //   state.byOwner[ownerId] = {
      //     items: articles,
      //     isLoading: false,
      //     error: null,
      //   };
      // })
      // .addCase(fetchArticlesByOwner.rejected, (state, action) => {
      //   const { ownerId, message } = action.payload || {};
      //   state.byOwner[ownerId] = state.byOwner[ownerId] || {
      //     items: [],
      //     isLoading: false,
      //     error: null,
      //   };
      //   state.byOwner[ownerId].isLoading = false;
      //   state.byOwner[ownerId].error = message || "Failed to load";
      // });
  },
});

export const articlesReducer = slice.reducer;
