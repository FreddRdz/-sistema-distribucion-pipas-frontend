import { CityPage } from '../components/CityPage';
import { Navbar } from '../components/Navbar';
import { links } from '../helpers/links';

export const Cities = () => {
  return (
    <>
      <Navbar props={{ links: links, logout: true }} />
      <CityPage />
    </>
  );
};
