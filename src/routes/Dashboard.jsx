import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Cities } from '../pages/Cities';
import { CityDetail } from '../pages/CityDetail';
import { Home } from '../pages/Home';
import { Map } from '../pages/Map';
import { Pipes } from '../pages/Pipes';

export const Dashboard = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='pipes' element={<Pipes />} />
      <Route path='cities' element={<Cities />} />
      <Route path='cities/:cityId' element={<CityDetail />} />
      <Route path='map' element={<Map />} />
    </Routes>
  );
};
