import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI";

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchAll",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await publicAPI.get(
        `/api/users/${userId}/saved-articles`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const articles = Array.isArray(data.data.savedArticles)
        ? data.data.savedArticles.map(a => (typeof a === "object" ? a._id : a))
        : [];
      return articles;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmarks/add",
  async ({ userId, articleId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await publicAPI.post(
        `/api/users/${userId}/saved-articles/${articleId}`,
        null, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return articleId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmarks/remove",
  async ({ userId, articleId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await publicAPI.delete(
        `/api/users/${userId}/saved-articles/${articleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return articleId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const selectBookmarks = (state) => Array.isArray(state.bookmarks?.items) ? state.bookmarks.items : [];
export const selectBookmarksLoading = (state) => state.bookmarks?.isLoading;
export const selectBookmarksError = (state) => state.bookmarks?.error;


