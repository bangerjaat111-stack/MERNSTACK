import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/DataContext.jsx';

export default function ProtectedRoute({ children }) {
  const { signin } = useAuth();

  if (!signin) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
