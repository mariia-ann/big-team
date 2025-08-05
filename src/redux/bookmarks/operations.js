import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI";

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchAll",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("fetchBookmarks thunk called, userId:", userId);
      const { data } = await publicAPI.get(
        `/authors/${userId}/saved-articles`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmarks/add",
  async ({ userId, articleId }, thunkAPI) => {
    try {
      console.log("addBookmark thunk called:", userId, articleId);
      const token = thunkAPI.getState().auth.token;
      await publicAPI.patch(
        `/authors/${userId}/saved-articles/${articleId}`,
        {},
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
      console.log("removeBookmark thunk called:", userId, articleId);
      const token = thunkAPI.getState().auth.token;
      await publicAPI.delete(
        `/authors/${userId}/saved-articles/${articleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return articleId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


