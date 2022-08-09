import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../lib/api';

interface IAuthSlice {
  status: string;
  token: string;
  user: object;
}

interface ILoginInput {
  email: string;
  password: string;
}

const initialState: IAuthSlice = {
  status: 'idle',
  token: null!,
  user: null!,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.token = null!;
        state.user = null!;
      });
  },
});

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: ILoginInput) => {
    const { email, password }: { email: string; password: string } = data;
    const res = await api.post(
      '/auth/login',
      JSON.stringify({ email, password })
    );

    return res.data;
  }
);

export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;