// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { loadState, saveState } from './localStorage';

const user = JSON.parse(localStorage.getItem('currentUser'));
const userId = user ? user.email : null;

const preloadedState = userId ? loadState(userId) : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  if (userId) {
    saveState(store.getState(), userId);
  }
});

export default store;