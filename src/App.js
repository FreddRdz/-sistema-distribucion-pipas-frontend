import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Map } from './pages/Map';
import { Pipes } from './pages/Pipes';
import { Cities } from './pages/Cities';
import { CityDetail } from './pages/CityDetail';

// Estilos
import './styles/navbar.css';
import './styles/forms.css';
import './styles/home.css';
import './styles/cities.css';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='pipes' element={<Pipes />} />
      <Route path='cities' element={<Cities />} />
      <Route path='cities/:cityId' element={<CityDetail />} />
      <Route path='login' element={<Login />} />
      <Route path='map' element={<Map />} />
    </Routes>
  );
};
