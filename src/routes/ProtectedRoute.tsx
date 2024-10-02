import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactNode; 
  requiredRole: string;   
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const userRole = localStorage.getItem('role'); 

  if (userRole && userRole === requiredRole) {
    return <>{element}</>; 
  } else {
    return <Navigate to="/" replace />;
  }
};

export { ProtectedRoute } ;