import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI.js";

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  /*async (_, thunkAPI) => {*/
  async ({ page, limit, type }, thunkAPI) => {
    try {
      /* const response = await publicAPI.get("/api/articles");*/
      const response = await publicAPI.get("/api/articles", {
        params: { page, limit, type },
      });

      const articles = Array.isArray(response.data?.data?.data)
        ? response.data.data.data
        : [];
      return articles;
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
      const response = await publicAPI.post("/api/articles", item);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const incrementPage = (currentPage) => currentPage + 1;
export const selectFilter = (state) => state.articles.filter;
