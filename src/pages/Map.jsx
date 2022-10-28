import { MapPage } from '../components/MapPage';
import { Navbar } from '../components/Navbar';
import { links } from '../helpers/links';

export const Map = () => {
  return (
    <>
      <Navbar props={{ links: links, logout: true }} />
      <MapPage />
    </>
  );
};
