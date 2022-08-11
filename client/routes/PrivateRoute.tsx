import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectAuthUser } from '../features/auth/authSlice';

const PrivateRoute = ({ children }) => {
  const { status, user } = useAppSelector(selectAuthUser);
  const location = useLocation();

  if (status === 'loading') {
    return <h1>Loading.....</h1>;
  }

  if (status === 'failed' && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
