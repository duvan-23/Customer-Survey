import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactNode; 
  requiredRole: Array<string>;   
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const userRole = localStorage.getItem('userRole'); 
  
  if (!userRole || requiredRole.findIndex(item => JSON.parse(userRole).includes(item))<0) {
    return <Navigate to="/" replace />;
  } else {
    return <>{element}</>; 
  }
};

export { ProtectedRoute } ;