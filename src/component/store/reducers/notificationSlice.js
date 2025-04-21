import {createReducer} from '@reduxjs/toolkit';
import {loadUnreadNotifications, markNotificationAsRead} from "../actions/notification";

const initialState = {
  notifications: [],
  unreadCount: 0,
  status: ' ',
  statusRead: '',
};

export const notificationsSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUnreadNotifications.pending, (state) => {
      state.status = 'pending';  // В процессе загрузки
    })
    .addCase(loadUnreadNotifications.fulfilled, (state, {payload}) => {
      state.status = 'ok';
      state.notifications = payload;
      state.unreadCount = payload.filter((notif) => !notif.read).length;
    })
    .addCase(loadUnreadNotifications.rejected, (state) => {
      state.status = 'error';  // Ошибка при загрузке
    })

    .addCase(markNotificationAsRead.pending, (state) => {
      state.statusRead = 'pending';
    })
    .addCase(markNotificationAsRead.fulfilled, (state, action) => {
      state.statusRead = 'ok';
      const notification = state.notifications.find((notif) => notif.id === action.payload
      );
      if (notification) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    })
    .addCase(markNotificationAsRead.rejected, (state) => {
      state.statusRead = 'error';
    })


    .addCase('notifications/addNotification', (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
      state.unreadCount++;
    })


    .addCase('notifications/setNotifications', (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((notif) => !notif.read).length;
    })




});

