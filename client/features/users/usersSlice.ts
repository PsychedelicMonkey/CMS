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
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.errors = null!;

        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action: AnyAction) => {
        state.status = 'failed';
        state.errors = action.payload.errors;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.errors = null!;

        console.log(action.payload);
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: AnyAction) => {
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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: any, { rejectWithValue }) => {
    const { id, name, email }: { id: string; name: string; email: string } =
      data;
    try {
      const res = await api.put(
        `/users/${id}`,
        JSON.stringify({ name, email })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (data: any, { rejectWithValue }) => {
    const { id }: { id: string } = data;
    try {
      await api.delete(`/users/${id}`);

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
