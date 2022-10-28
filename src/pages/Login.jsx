import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Navbar } from '../components/Navbar';

export const Login = () => {
  const links = [];

  return (
    <>
      <Navbar props={{ links: links, logout: false }} />
      <LoginForm />
    </>
  );
};
