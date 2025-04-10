import { createReducer } from '@reduxjs/toolkit';
import {fetchCategories} from "../actions/adminCategory";

const initialState = {
  categories: [],
  loading: true,
};

export const adminCategorySlice = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCategories.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.categories = payload;
    })
});

