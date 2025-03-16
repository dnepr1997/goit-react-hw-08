import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const IsLoggedIn = useSelector(selectIsLoggedIn);
  return IsLoggedIn ? children : <Navigate to="/login" />;
};
