import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { UsuariosPage } from '../components/UsuariosPage';
import { links, linksAdmin } from '../helpers/links';

export const Usuarios = () => {
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
      <UsuariosPage />
    </>
  );
};
