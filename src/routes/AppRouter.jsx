import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='login/*'
          element={
            <PublicRoute>
              <Routes>
                <Route path='/*' element={<Login />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
