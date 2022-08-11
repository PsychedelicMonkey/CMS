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

interface IUserData {
  name: string;
  email: string;
  password: string;
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
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await api.get('/users');
  return res.data;
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: IUserData) => {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = data;
    const res = await api.post(
      '/users/',
      JSON.stringify({ name, email, password })
    );

    return res.data;
  }
);

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
