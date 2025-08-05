import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI.js";
import { axiosAPI } from "../auth/operations.js";


export const fetchAuthors = createAsyncThunk(
  "authors/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await publicAPI.get("/api/creators/all");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchTopAuthors = createAsyncThunk(
  "authors/fetchTop",
  async (_, thunkAPI) => {
    try {
      const response = await publicAPI.get("/api/creators/top-creators");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAuthor = createAsyncThunk(
  "authors/fetchAuthor",
  async (id, thunkAPI) => {
    try {
      const response = await publicAPI.get(`/api/users/${id}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAuthorSavedArticles = createAsyncThunk(
  "authors/fetchAuthorSavedArticles",
  async (id, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/${id}/saved-articles`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addAuthorSavedArticles = createAsyncThunk(
  "authors/addAuthorSavedArticles",
  async ({ userId, articleId }, thunkAPI) => {
    try {
      const response = await axiosAPI.post(`/${userId}/saved-articles/${articleId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);