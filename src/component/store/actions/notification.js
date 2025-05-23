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
      return notificationId;
    } catch (error) {
      console.log(error,"noy")
      return rejectWithValue(error.response.data || error.message);
    }
  }
);



export const addNotification = (notification) => {
  return {
    type: 'notifications/addNotification',
    payload: notification,
  };
};
