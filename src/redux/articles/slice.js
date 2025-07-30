import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
  name: "articles",
  initialState,
});

export const articlesReducer = slice.reducer;
