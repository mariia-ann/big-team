import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://harmoniq-server-big-team.onrender.com";

export const axiosAPI = axios.create({
  baseURL: "https://harmoniq-server-big-team.onrender.com",
});

const setAuthHeader = (token) => {
  axiosAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axiosAPI.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      const response = await axiosAPI.post("/api/auth/register", body);
      const token = response.data?.data?.accessToken;
      if (token) setAuthHeader(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const response = await axiosAPI.post("/api/auth/login", body);
      const token = response.data?.data?.accessToken;
      if (token) setAuthHeader(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axiosAPI.post("/api/auth/logout");
      removeAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const savedToken = thunkAPI.getState().auth.token;
      console.log(savedToken);

      if (!savedToken) {
        return thunkAPI.rejectWithValue("Token is not exist");
      }

      setAuthHeader(savedToken);
      const response = await axiosAPI.post("/api/auth/refresh");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
