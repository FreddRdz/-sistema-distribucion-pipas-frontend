import { Link } from 'react-router-dom';

export const Navbar = (links) => {
  const { props } = links;

  return (
    <header className='header'>
      <div className='page-title__content'>
        <h2 className='page-title'>Agua de Nuevo León</h2>
        <nav className='navbar'>
          <ul className='ul-navbar'>
            {props.map(({ pageName, linkTo }) => (
              <Link className='navbar-links' to={linkTo} key={pageName}>
                {pageName}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <img
          src='http://atlas.nl.gob.mx/images/LOGON300XL.png'
          className='page-logo'
          alt='logo del estado'
        />
      </div>
    </header>
  );
};
