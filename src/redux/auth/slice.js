import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    id: null,
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
          id: action.payload.data._id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data._id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data._id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatarUrl: action.payload.data.avatarUrl,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = slice.reducer;

