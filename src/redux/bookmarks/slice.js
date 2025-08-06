import { createSlice } from "@reduxjs/toolkit";
import { fetchBookmarks, addBookmark, removeBookmark } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    clearBookmarks(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload.map(String)
          : [];
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const id = String(action.payload);
        if (!state.items.includes(id)) {
          state.items.push(id);
        }
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        const id = String(action.payload);
        state.items = state.items.filter((itemId) => itemId !== id);
      });
  },
});

export const { clearBookmarks } = bookmarksSlice.actions;
export const bookmarksReducer = bookmarksSlice.reducer;




