// src/components/LocalAuthGuards.jsx
import { Navigate, Outlet } from 'react-router-dom';

const isAuthed = () => Boolean(localStorage.getItem('token'));

// If user is NOT authenticated -> show children (guests)
export const OnlyGuest = ({ redirectTo = '/' }) => {
  return !isAuthed() ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

// If user IS authenticated -> show children (protected)
export const RequireAuth = ({ redirectTo = '/login' }) => {
  return isAuthed() ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
