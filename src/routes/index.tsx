import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home'; 
import { Survey } from '../pages/Survey';
import { ProtectedRoute } from './ProtectedRoute';
import { Statistics } from '../pages/Statistics';
import { FormProvider } from '../contexts/Form/context';
import { HomeProvider } from '../contexts/home/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeProvider>
        <Home />
      </HomeProvider>
    ),
  },
  {
    path: '/statistics',
    element: (
      <ProtectedRoute 
      element={<Statistics />}  
      requiredRole={["admin"] }  
    />
  ),
  },
  {
    path: '/survey',
    element: (
      <FormProvider>
        <ProtectedRoute 
          element={<Survey />}  
          requiredRole={["user"]}   
        />
      </FormProvider>
    ), 
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, 
  }
]);

export default router;