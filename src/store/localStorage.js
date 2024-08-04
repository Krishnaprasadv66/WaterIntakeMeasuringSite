// src/store/localStorage.js

export const loadState = (userId) => {
  try {
    const serializedState = localStorage.getItem(`state_${userId}`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, userId) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`state_${userId}`, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};