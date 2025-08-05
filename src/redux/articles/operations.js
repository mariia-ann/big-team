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
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token available");
      }

      publicAPI.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await publicAPI.post("/api/articles", item);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loadArticles = createAsyncThunk(
  "articles/loadArticles",
  async ({ page, limit, type }, thunkAPI) => {
    // 🧼 Спочатку очищаємо список, якщо це "All" і перша сторінка
    if (type === "All" && page === 1) {
      thunkAPI.dispatch({ type: "articles/clearArticles" });
    }

    // 🎯 Потім викликаємо fetchArticles — він вже обробляється у slice
    return await thunkAPI.dispatch(fetchArticles({ page, limit, type }));
  }
);

export const incrementPage = (currentPage) => currentPage + 1;
export const selectFilter = (state) => state.articles.filter;

export const fetchArticlesByOwner = createAsyncThunk(
  "articles/fetchArticlesByOwner",
  async (ownerId, thunkAPI) => {
    try {
      const response = await publicAPI.get("/api/articles", {
        params: { ownerId },
      });
      // console.log("fetchArticlesByOwner response:", response.data);

      const innerData = response?.data?.data;
      const articles = Array.isArray(innerData?.data) ? innerData.data : [];

      return { ownerId, articles };
    } catch (e) {
      return thunkAPI.rejectWithValue({ ownerId, message: e.message });
    }
  }
);
