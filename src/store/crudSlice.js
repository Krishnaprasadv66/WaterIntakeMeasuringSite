import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: null,
};

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.date === newItem.date
      );
      if (existingItem) {
        state.error = 'You can only add one entry per day.';
      } else {
        state.items.push(newItem);
        state.error = null;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, water } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.name = name;
        existingItem.water = water;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addItem, removeItem, updateItem, clearError } = crudSlice.actions;

export default crudSlice.reducer;