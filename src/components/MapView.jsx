import { useEffect, useState } from 'react';
import { PolygonView } from './PolygonView';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const url = 'https://sistema-nl-agua.herokuapp.com/api/v1/cities';
const getPipesUrl = 'https://sistema-nl-agua.herokuapp.com/api/v1/pipes';

export const MapView = () => {
  const [data, setData] = useState([]);
  const [pipes, setPipes] = useState([]);

  useEffect(() => {
    getData();
    getAllPipes();
  }, []);

  const getAllPipes = async () => {
    try {
      const res = await axios.get(getPipesUrl, {
        headers: { Authorization: localStorage.getItem('TokenKey') },
      });
      const { data } = res;
      setPipes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <MapContainer
      center={{ lat: '25.677408923871965', lng: '-100.32140489077565' }}
      zoom={11}
      scrollWheelZoom={true}
      className='map'
    >
      <TileLayer
        attribution='<a href="https://carto.com/" target="_blank">&copy; CARTO</a> <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url='https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}@2x.png?key=785mOJMbcMAiVTeTPI60'
      />
      {data.map(({ _id, coordinates, name, waterLevel }) => {
        const coords = coordinates[0].map((item) => [item[1], item[0]]);

        if (waterLevel === 'Normal') {
          return (
            <PolygonView
              props={{
                color: '#37c871',
                mouseOverColor: '#299655',
                _id,
                name,
                coords,
                info: 'Normal',
              }}
            />
          );
        } else if (waterLevel === 'Deficient') {
          return (
            <PolygonView
              props={{
                color: '#ffcc00',
                mouseOverColor: '#d6ac02',
                _id,
                name,
                coords,
                info: 'Deficiente',
              }}
            />
          );
        } else {
          return (
            <PolygonView
              props={{
                color: '#ff0000',
                mouseOverColor: '#8a0101',
                _id,
                name,
                coords,
                info: 'Bajo',
              }}
            />
          );
        }
      })}
      {pipes.map(({ _id, placas, percentageWater, capacity, position }) => {
        return (
          <Marker position={position} key={_id}>
            <Popup>
              <div className='container'>
                <p className='my-1'>Placas: {placas}</p>
                <p className='my-1'>Porcentaje de agua: {percentageWater}</p>
                <p className='my-1'>Capacidad: {capacity} Litros</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
