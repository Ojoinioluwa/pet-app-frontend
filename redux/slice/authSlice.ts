import { createSlice } from '@reduxjs/toolkit';
import getUserFromStorage from '../../utils/getUserFromStorage';

const initialState = {
  user: null,
  token: null,
};

// Make the slice setup async if needed
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOutAction: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Async function to initialize the state
export const loadUserFromStorage = async () => {
  const storedUser = await getUserFromStorage();
  return {
    user: storedUser ? storedUser.user : null,
    token: storedUser ? storedUser.token : null,
  };
};

export const { loginAction, logOutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
