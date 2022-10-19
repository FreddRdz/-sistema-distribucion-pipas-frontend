import React from 'react';
import { CityDetailPage } from '../components/CityDetailPage';
import { Navbar } from '../components/Navbar';
import { links } from '../helpers/links';

export const CityDetail = () => {
  return (
    <>
      <Navbar props={links} />
      <CityDetailPage />
    </>
  );
};
