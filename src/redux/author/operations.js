import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../api/publicAPI.js";


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
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);