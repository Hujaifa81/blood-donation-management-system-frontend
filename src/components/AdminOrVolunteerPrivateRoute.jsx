import React from 'react';
import useRoleStatus from '../hooks/useRoleStatus';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

const AdminOrVolunteerPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useRoleStatus();

  // Wait until both auth and role data are ready
  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (userRole !== 'admin' && userRole !== 'volunteer') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminOrVolunteerPrivateRoute;
