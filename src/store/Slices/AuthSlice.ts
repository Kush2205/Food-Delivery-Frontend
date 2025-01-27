import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload);
    },
    clearToken(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    loadTokenFromStorage(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { setToken, clearToken, loadTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;