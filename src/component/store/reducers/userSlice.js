import { createReducer } from '@reduxjs/toolkit';
import {loginUser, setLogin} from "../actions/user";

const initialState = {
  user: {
    email: '',
    password: ''
  },
  // user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const userSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      // state.user = action.payload.user;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(setLogin, (state, { payload }) => {
      const { path, value } = payload;
      state.user[path] = value;
    });

});

