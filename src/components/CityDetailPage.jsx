import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { TableData } from './TableData';
import { TableBodyAdd } from './TableBodyAdd';
import { RowEmpty } from './RowEmpty';

export const CityDetailPage = () => {
  const [city, setCity] = useState({});
  const [listCityPipes, setListCityPipes] = useState([]);
  const [pipes, setPipes] = useState([]);
  const { cityId } = useParams();
  const getPipesUrl = 'https://sistema-nl-agua.herokuapp.com/api/v1/pipes';

  const getPipes = async () => {
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

  useEffect(() => {
    const getCityDataById = async () => {
      try {
        const res = await axios.get(
          `https://sistema-nl-agua.herokuapp.com/api/v1/cities/${cityId}`,
          {
            headers: { Authorization: localStorage.getItem('TokenKey') },
          }
        );
        const { data } = res;
        setCity(data.data);
        setListCityPipes(data.data.pipes);
      } catch (error) {
        console.log(error);
      }
    };
    getCityDataById();
    getPipes();
  }, [cityId]);

  return (
    <Container className='mt-4'>
      <Row className='mb-3'>
        <Col>
          <h2>{`Municipio: ${city.name}`}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Pipas asignadas</h3>
              </Card.Title>
              <Table>
                <thead>
                  <tr>
                    <th>Placas</th>
                    <th>Capacidad en Litros</th>
                    <th>Porcentaje almacenado %</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listCityPipes.length === 0 ? (
                    <RowEmpty
                      props={{
                        text: 'No hay pipas asignadas en este municipio',
                      }}
                    />
                  ) : (
                    <TableData
                      props={{
                        cityId,
                        listCityPipes,
                        setListCityPipes,
                        pipes,
                        setPipes,
                      }}
                    />
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Pipas disponibles</h3>
              </Card.Title>
              <Table>
                <thead>
                  <tr>
                    <th>Placas</th>
                    <th>Capacidad en Litros</th>
                    <th>Porcentaje almacenado %</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pipes.length === 0 ? (
                    <RowEmpty props={{ text: 'No hay pipas disponibles' }} />
                  ) : (
                    <TableBodyAdd
                      props={{
                        cityId,
                        listCityPipes,
                        setListCityPipes,
                        pipes,
                        setPipes,
                      }}
                    />
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
