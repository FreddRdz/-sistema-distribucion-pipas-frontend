import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <div className='main-homePage'>
        <div className='home-cities-container'>
          <p className='home-title-city'>Municipios</p>
          <p className='home-text-city'>
            Consulte la información de los diferentes municipios de la área
            metropolitana de Nuevo León.
          </p>
          <Link to='cities' className='home-button-city'>
            Ver más
          </Link>
        </div>
        <div className='home-pipes-container'>
          <p className='home-title-pipe'>Pipas</p>
          <p className='home-text-pipe'>
            Consulte la información de la lista de pipas historicas registradas
            en el sistema.
          </p>
          <Link to='pipes' className='home-button-pipe'>
            Ver más
          </Link>
        </div>
        <div className='home-map-container'>
          <p className='home-title-map'>Mapa</p>
          <p className='home-text-map'>
            Consulte el mapa del área metropolitana para tener.
          </p>
          <Link to='/map' className='home-button-map'>
            Ver más
          </Link>
        </div>
      </div>
    </>
  );
};
