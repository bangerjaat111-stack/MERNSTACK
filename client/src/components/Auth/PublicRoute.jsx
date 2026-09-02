import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/DataContext.jsx';

export default function PublicRoute({ children }) {
  const { signin } = useAuth();

  if (signin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
