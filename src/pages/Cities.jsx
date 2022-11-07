import axios from 'axios';
import { useEffect, useState } from 'react';
import { CityPage } from '../components/CityPage';
import { Navbar } from '../components/Navbar';
import { links, linksAdmin } from '../helpers/links';

export const Cities = () => {
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

      <CityPage />
    </>
  );
};
