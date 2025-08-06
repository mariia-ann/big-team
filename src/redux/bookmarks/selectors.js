import { createSelector } from "@reduxjs/toolkit";

const selectBookmarksState = (state) => state.bookmarks;

export const selectBookmarks = createSelector(
  [selectBookmarksState],
  (bookmarks) => Array.isArray(bookmarks.items) ? bookmarks.items : []
);

export const selectBookmarksLoading = (state) => state.bookmarks?.isLoading;
export const selectBookmarksError = (state) => state.bookmarks?.error;




