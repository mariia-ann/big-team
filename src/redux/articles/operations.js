import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI.js";


export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await publicAPI.get("/api/articles");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (id, thunkAPI) => {
    try {
      const response = await publicAPI.get(`/api/articles/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (item, thunkAPI) => {
    try {
      const response = await publicAPI.get("/api/articles", item);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);