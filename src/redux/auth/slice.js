import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    email: null,
    name: null,
    avatarUrl: null,
  },
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = slice.reducer;
