// import { createReducer } from '@reduxjs/toolkit';
// import {getUserProfileRequest, loginUser, setClickedBar, setLogin} from "../actions/user";
//
// const initialState = {
//   clickedBar: false,
//   user: {
//     email: '',
//     password: ''
//   },
//   // user: null,
//   token: localStorage.getItem('token') || null,
//   loading: false,
//   error: null,
// };
//
// export const userSlice = createReducer(initialState, (builder) => {
//   builder
//     .addCase(loginUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(loginUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.token = action.payload.token;
//       // state.user = action.payload.user;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     })
//
//
//     .addCase(getUserProfileRequest.pending, (state) => {
//       state.error = null;
//     })
//     .addCase(getUserProfileRequest.fulfilled, (state, { payload }) => {
//       console.log(payload)
//       const { firstName, lastName, gender, dateOfBirth, address } = payload;
//       state.profile = { firstName, lastName, gender, dateOfBirth, address };
//       state.user = payload;
//     })
//     .addCase(getUserProfileRequest.rejected, (state) => {
//       state.error = 'Error fetching user profile data';
//     })
//
//
//     .addCase(setLogin, (state, { payload }) => {
//       const { path, value } = payload;
//       state.user[path] = value;
//     })
//
//     .addCase(setClickedBar, (state, {payload}) => {
//         state.clickedBar = payload;
//       })
//     })
//
//
//
//
//
//
// src/store/reducers/userSlice.js


// import { createReducer } from '@reduxjs/toolkit';
// import {
//   getUserProfileRequest, loginUser,
//   // loginUser,
//   setClickedBar,
//   setLogin,
// } from '../actions/user';
//
// const initialState = {
//   clickedBar: false,
//   // user: {
//   //   email: '',
//   //   password: '',
//   // },
//   user: {},
//   token: localStorage.getItem('token') || null,
//   loading: false,
//   error: null,
//   profile: null,
// };
//
// export const userSlice = createReducer(initialState, (builder) => {
//   builder
//     // 🔐 LOGIN
//     .addCase(loginUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(loginUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.token = action.payload.token;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     })
//
//     // 👤 PROFILE FETCH
//     .addCase(getUserProfileRequest.pending, (state) => {
//       state.error = null;
//     })
//     .addCase(getUserProfileRequest.fulfilled, (state, { payload }) => {
//       const { firstName, lastName, gender, dateOfBirth, address } = payload;
//       state.profile = { firstName, lastName, gender, dateOfBirth, address };
//       state.user = payload;
//     })
//     .addCase(getUserProfileRequest.rejected, (state) => {
//       state.error = 'Error fetching user profile data';
//     })
//
//     // 📝 INPUT UPDATES
//     .addCase(setLogin, (state, { payload }) => {
//       const { path, value } = payload;
//       state.user[path] = value;
//     })
//
//     // UI STATE
//     .addCase(setClickedBar, (state, { payload }) => {
//       state.clickedBar = payload;
//     });
// });


import { createReducer } from '@reduxjs/toolkit';
import {
  getUserProfileRequest,
  loginUser,
  setClickedBar,
  setLogin,
  logoutUser
} from '../actions/user';
import {toast} from "react-toastify";

const initialState = {
  clickedBar: false,
  user: {},
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  profile: null,
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
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

    .addCase(setLogin, (state, { payload }) => {
      const { path, value } = payload;
      state.user[path] = value;
    })

    .addCase(setClickedBar, (state, { payload }) => {
      state.clickedBar = payload;
    })


    .addCase(logoutUser, (state) => {
      state.user = {};
      state.token = null;
      state.profile = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      toast.info("You have been logged out");
    });
});
