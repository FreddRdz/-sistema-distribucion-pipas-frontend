import { Col, Container, Row } from 'react-bootstrap';
import { MapView } from './MapView';

export const MapPage = () => {
  return (
    <>
      <Container>
        <Row>
          {/* <Col>Hola</Col> */}
          <Col>
            <MapView />
          </Col>
        </Row>
      </Container>
    </>
  );
};
