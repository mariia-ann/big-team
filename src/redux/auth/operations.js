import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://harmoniq-server-big-team.onrender.com",
  withCredentials: true,
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
      if (token) {
        setAuthHeader(token);
        localStorage.setItem("hasSession", "true");
      }
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
      if (token) {
        setAuthHeader(token);
        localStorage.setItem("hasSession", "true");
      }
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
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      if (!accessToken) {
        return thunkAPI.rejectWithValue("No access token in state");
      }

      await axiosAPI.post("/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      removeAuthHeader();
      localStorage.removeItem("hasSession");
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
      const response = await axiosAPI.post("/api/auth/refresh");
      const { accessToken } = response.data?.data || {};
      if (accessToken) setAuthHeader(accessToken);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
