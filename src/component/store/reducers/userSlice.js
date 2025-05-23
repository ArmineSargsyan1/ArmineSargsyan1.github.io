import { createReducer } from '@reduxjs/toolkit';
import {
  getUserProfileRequest,
  loginUser,
  setClickedBar,
  logoutUser, setFieldValue, resetUser
} from '../actions/user';
import {toast} from "react-toastify";

const initialState = {
  clickedBar: false,
  user: {},
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  profile: null,
  message: "",
  isAdmin: true
};

export const userSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.token = payload.token;
      state.message = payload.message;
      console.log(payload)
      state.isAdmin = payload.isAdmin && !payload.superAdmin;

    })
    .addCase(loginUser.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload.errors;
      state.message = payload.message
    })

    .addCase(getUserProfileRequest.pending, (state) => {
      state.loading=true
      state.error = null;
    })
    .addCase(getUserProfileRequest.fulfilled, (state, { payload }) => {
      const { firstName, lastName, gender, dateOfBirth, address } = payload;
      state.profile = { firstName, lastName, gender, dateOfBirth, address };
      state.user = payload;
      state.loading = false
    })
    .addCase(getUserProfileRequest.rejected, (state) => {
      state.error = 'Error fetching user profile data';
      state.loading = false
    })

    .addCase(setFieldValue, (state, { payload }) => {
      const { path, value } = payload;
      state.user[path] = value;

      state.error = {}

      state.message = ""
    })

    .addCase(setClickedBar, (state, { payload }) => {
      state.clickedBar = payload;
    })


    .addCase(logoutUser, (state) => {
      state.user = {};
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
      toast.info("You have been logged out");
    })

    .addCase(resetUser, (state) => {
      state.user = {};
      state.isAdmin = true
    });
});
