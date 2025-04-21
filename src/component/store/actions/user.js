import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




import { toast } from 'react-toastify';
import Api from "../../../Api";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await Api.getUser({user});
      toast.success("Login successful!");
      localStorage.setItem('token', data.token || '');
      console.log(data)
      return data;
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Login failed");
      return rejectWithValue(err.response.data.message);
    }
  }
);



export const getUserProfileRequest = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const {data : {user}} = await Api.getProfile();
    return user
  }
);

export const setLogin = createAction('login/user');

export const setClickedBar = createAction('clickedBar');

export const logoutUser = createAction('auth/logoutUser');
