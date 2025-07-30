import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
  name: "author",
  initialState,
});

export const authorReducer = slice.reducer;
