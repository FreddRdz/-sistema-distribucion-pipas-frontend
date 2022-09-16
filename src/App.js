import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

// Estilos
import './styles/navbar.css';
import './styles/forms.css';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
    </Routes>
  );
};
