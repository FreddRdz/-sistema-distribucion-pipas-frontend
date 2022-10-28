import { Navbar } from '../components/Navbar';
import { PipesPage } from '../components/PipesPage';
import { links } from '../helpers/links';

export const Pipes = () => {
  return (
    <>
      <Navbar props={{ links: links, logout: true }} />
      <PipesPage />
    </>
  );
};
