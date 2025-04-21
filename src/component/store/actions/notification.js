import axios from 'axios';
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../Api";

const serverUrl = 'https://world-of-construction.onrender.com';
const token = localStorage.getItem('token');

export const loadUnreadNotifications = createAsyncThunk(
  'notifications/loadUnreadNotifications', // Название действия
  async (_, { rejectWithValue }) => {
    try {

      const {data: {notifications}} = await Api.getUnreadNotifications()
      return notifications;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      await Api.markNotificationAsRead({notificationId})
      // await axios.patch(
      //   `${serverUrl}/admin-notification/${notificationId}/read`,
      //   null,
      //   { headers: { Authorization: token } }
      // );
      console.log(notificationId,333333333333)
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);


export const setLogin = createAction('login/user');

export const addNotification = (notification) => {
  return {
    type: 'notifications/addNotification',
    payload: notification,
  };
};
export const setReadStatus = createAction("read/status");
export const setStatus = createAction("notifications/status");
