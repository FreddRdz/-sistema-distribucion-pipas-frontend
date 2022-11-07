import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { PipesPage } from '../components/PipesPage';

import { links, linksAdmin } from '../helpers/links';

export const Pipes = () => {
  const [role, setRole] = useState('');

  const getRole = async () => {
    try {
      const res = await axios.post(
        'https://sistema-nl-agua.herokuapp.com/api/v1/auth/validate',
        {},
        { headers: { Authorization: localStorage.getItem('TokenKey') } }
      );
      const { role } = res.data;
      setRole(role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRole();
  }, []);
  return (
    <>
      {role === 'user' ? (
        <Navbar props={{ links: links, logout: true }} />
      ) : (
        <Navbar props={{ links: linksAdmin, logout: true }} />
      )}
      <PipesPage />
    </>
  );
};
