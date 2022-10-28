import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Usuarios } from '../pages/Usuarios';
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
          path='users/*'
          element={
            <PrivateRoute>
              <Routes>
                <Route path='/*' element={<Usuarios />} />
              </Routes>
            </PrivateRoute>
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
