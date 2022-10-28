// import { useContext } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = (props) => {
  const { logoutI } = useContext(AuthContext);
  const { links, logout } = props.props;
  const navigate = useNavigate();

  const handleClickLogout = () => {
    logoutI();
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='page-title__content'>
        <h2 className='page-title'>Agua de Nuevo León</h2>
        <nav className='navbar'>
          <ul className='ul-navbar m-0'>
            {links.map(({ pageName, linkTo }) => (
              <Link className='navbar-links' to={linkTo} key={pageName}>
                {pageName}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <div className='d-flex align-items-center gap-3'>
        <img
          src='http://atlas.nl.gob.mx/images/LOGON300XL.png'
          className='page-logo'
          alt='logo del estado'
        />
        {logout ? <h3 onClick={handleClickLogout}>Logout</h3> : null}
      </div>
    </header>
  );
};
