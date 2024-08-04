// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setUserFromLocalStorage(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.user = user;
      }
    }
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  setUser,
  removeUser,
  setUserFromLocalStorage
} = authSlice.actions;

export default authSlice.reducer;