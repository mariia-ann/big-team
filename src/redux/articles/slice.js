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
    page: 1,
    limit: 12,
    filter: "All",
    hasMore: true,
  },
  /*---------------------------------------*/
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearArticles(state) {
      state.items = [];
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
  },
  /*---------------------------------------*/
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, handlePending)
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        /* state.items = action.payload;*/
        if (state.page === 1) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        if (action.payload.length < state.limit) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
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
      .addCase(addArticle.rejected, handleRejected);
  },
});

export const articlesReducer = slice.reducer;
export const { setFilter, incrementPage, setPage, clearArticles, setHasMore } =
  slice.actions;
