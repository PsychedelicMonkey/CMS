import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserSlice {
  status: string;
  users: Array<User>;
}

const initialState: IUserSlice = {
  status: 'idle',
  users: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await api.get('/users');
  return res.data;
});

export const selectUsers = (state: RootState) => state.users.users;

export default userSlice.reducer;
