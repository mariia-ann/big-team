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
        console.log("fetchBookmarks.fulfilled", action.payload);
        state.isLoading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload.map((a) => (typeof a === "object" ? a._id : a))
          : [];
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        console.log("addBookmark.fulfilled", action.payload);
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        console.log("removeBookmark.fulfilled", action.payload);
        state.items = state.items.filter((id) => id !== action.payload);
      });
  },
});

export const { clearBookmarks } = bookmarksSlice.actions;
export const bookmarksReducer = bookmarksSlice.reducer;




