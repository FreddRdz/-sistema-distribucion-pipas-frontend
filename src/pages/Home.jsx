import { HomePage } from '../components/HomePage';
import { Navbar } from '../components/Navbar';
import { links } from '../helpers/links';

export const Home = () => {
  return (
    <>
      <Navbar props={{ links: links, logout: true }} />
      <HomePage />
    </>
  );
};
