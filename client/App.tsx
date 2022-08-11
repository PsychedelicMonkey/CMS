import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Users from './pages/Users';
import Register from './pages/auth/Register';
import { loadUser } from './features/auth/authSlice';
import { useAppDispatch } from './app/hooks';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
