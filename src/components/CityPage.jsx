import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const url = 'http://localhost:5050/api/v1/cities';

export const CityPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(url, {
        headers: { Authorization: localStorage.getItem('TokenKey') },
      });

      setData(res.data.data);
    } catch (error) {
      const { data } = error.response;
      setData(data);
    }
  };

  if (data.status === 409) {
    navigate('/login');
  } else {
    return (
      <main className='main-city'>
        <div className='main-city-container'>
          <div className='whole-city-container'>
            <h2 className='info-city-container'>
              Lista de municipios de Nuevo León
            </h2>

            {data.map(({ _id, name, pipes }) => {
              return (
                <div className='each-city-container' key={_id}>
                  <Link to={`/cities/${_id}`} className='link-city'>
                    <p className='city-name'>{name}</p>
                    <p className='pipes-length'>{`Pipas: ${pipes.length}`}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }
};
