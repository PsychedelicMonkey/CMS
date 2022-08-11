import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
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
  errors: Array<object>;
}

interface IUserData {
  name: string;
  email: string;
  password: string;
}

const initialState: IUserSlice = {
  status: 'idle',
  users: [],
  errors: null!,
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
        state.status = 'loaded';
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
        state.status = 'success';
        state.users.push(action.payload);
        state.errors = null!;
      })
      .addCase(createUser.rejected, (state, action: AnyAction) => {
        state.status = 'failed';
        state.errors = action.payload.errors;
      });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await api.get('/users');
  return res.data;
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: IUserData, { rejectWithValue }) => {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = data;
    try {
      const res = await api.post(
        '/users/',
        JSON.stringify({ name, email, password })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
