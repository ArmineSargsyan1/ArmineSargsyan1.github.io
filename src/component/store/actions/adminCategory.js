import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../Api";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const {data: {categories}} = await Api.getAdminCategories();
  return categories;
});
