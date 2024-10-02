import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home'; 
import { Survey } from '../pages/Survey';
import { ProtectedRoute } from './ProtectedRoute';
import { Statistics } from '../pages/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/statistics',
    element: (
      <ProtectedRoute 
      element={<Statistics />}  
      requiredRole="admin"   
    />
  ),
  },
  {
    path: '/survey',
    element: (
        <ProtectedRoute 
        element={<Survey />}  
        requiredRole="user"   
      />
    ), 
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, 
  }
]);

export default router;