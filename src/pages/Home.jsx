import axios from 'axios';
import { useEffect, useState } from 'react';
import { HomePage } from '../components/HomePage';
import { Navbar } from '../components/Navbar';
import { links, linksAdmin } from '../helpers/links';

export const Home = () => {
  const [role, setRole] = useState('');

  const getRole = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5050/api/v1/auth/validate',
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
      <HomePage />
    </>
  );
};
