// src/redux/bookmarks/selectors.js

export const selectBookmarks = (state) => {
  const items = state.bookmarks.items;
  if (typeof items === "string") {
    try {
      return JSON.parse(items);
    } catch {
      return [];
    }
  }
  return Array.isArray(items) ? items : [];
};

export const selectBookmarksLoading = (state) => state.bookmarks.isLoading;

export const selectBookmarksError = (state) => state.bookmarks.error;

