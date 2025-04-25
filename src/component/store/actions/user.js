import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




import { toast } from 'react-toastify';
import Api from "../../../Api";
import Utils from "../../helpers/Utils";
import _ from "lodash";



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    const errors = {};
    const { email, password } = user;
    // Validate password
    if (!password?.trim()) {
      errors.password = 'Password should not be empty.';
    } else if (!Utils.isPassword(password)) {
      errors.password = 'Password must be 8+ characters and include a number.';
    }

    // Validate email
    if (!email?.trim()) {
      errors.email = 'Email should not be empty.';
    } else if (!Utils.isEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!_.isEmpty(errors)) {
      return rejectWithValue({ errors });
    }

    try {
      const { data } = await Api.getUser({ user });

      toast.success('Login successful!');
      localStorage.setItem('token', data.token || '');

      return data;
    } catch (err) {
      console.log(err,"hhh")

      const message = err.response?.data?.message;
      toast.error(message);

      return rejectWithValue({
        message,
      });
    }
  }
);



// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (user, { rejectWithValue }) => {
//     const errors = {};
//     const { email, password } = user;
//     // Validate password
//     if (!password?.trim()) {
//       errors.password = 'Password should not be empty.';
//     } else if (!Utils.isPassword(password)) {
//       errors.password = 'Password must be 8+ characters and include a number.';
//     }
//
//     // Validate email
//     if (!email?.trim()) {
//       errors.email = 'Email should not be empty.';
//     } else if (!Utils.isEmail(email)) {
//       errors.email = 'Please enter a valid email address.';
//     }
//
//     if (!_.isEmpty(errors)) {
//       return rejectWithValue({ errors });
//     }
//
//     try {
//       const { data } = await Api.getUser({ user });
//
//       toast.success('Login successful!');
//       localStorage.setItem('token', data.token || '');
//
//       return data;
//     } catch (err) {
//
//       const message = err.response?.data?.message || 'Login failed';
//       const backendErrors = err.response?.data?.errors || null;
//
//       toast.error(message);
//
//       return rejectWithValue({
//         message,
//         errors: backendErrors
//       });
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (user, {rejectWithValue}) => {
//     const validationErrors = Utils.isValidateProfileData(payload);
//
//     if (!_.isEmpty(validationErrors)) {
//       return rejectWithValue(validationErrors);
//     }else{
//       try {
//         const { data } = await Api.getUser({user});
//         toast.success("Login successful!");
//         localStorage.setItem('token', data.token || '');
//         console.log(data)
//         return data;
//       } catch (err) {
//         console.log(err)
//         toast.error(err.response?.data?.message || "Login failed");
//         return rejectWithValue(err.response.data.message);
//     }
//
//   }
// );

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (user, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.getUser({user});
//       toast.success("Login successful!");
//       localStorage.setItem('token', data.token || '');
//       console.log(data)
//       return data;
//     } catch (err) {
//       console.log(err)
//       toast.error(err.response?.data?.message || "Login failed");
//       return rejectWithValue(err.response.data.message);
//     }
//   }
// );



export const getUserProfileRequest = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const {data : {user}} = await Api.getProfile();
    return user
  }
);

export const setFieldValue = createAction('login/user');

export const setClickedBar = createAction('clickedBar');

export const logoutUser = createAction('auth/logoutUser');
