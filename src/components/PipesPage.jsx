import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
// import { ShowModalPerPipe } from './ShowModalPerPipe';

export const PipesPage = () => {
  // Modal añadir pipe
  const [show, setShow] = useState(false);
  const [pipes, setPipes] = useState([]);
  const [backUpPipes, setBackUpPipes] = useState([]);
  // Modal editar pipe
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState('');
  //
  const [datos, setDatos] = useState({ placas: '', capacity: '' });
  const getPipesUrl = 'http://localhost:5050/api/v1/pipes';

  const inputText = useRef(null);
  const placasRef = useRef();
  const capacityRef = useRef();

  const handleOnChangeInput = () => {
    const text = inputText.current.value;

    const pipesFiltered = pipes.filter((element) =>
      element.placas.includes(text)
    );

    // Filtro para la busqueda de pipas por placas
    if (pipesFiltered.length === 0 || text.length === 0) {
      setPipes(backUpPipes);
    } else {
      setPipes(pipesFiltered);
    }
  };

  const handleClose = () => {
    datos.capacity = '';
    datos.placas = '';
    setShow(false);
  };
  const handleShow = () => {
    datos.capacity = '';
    datos.placas = '';
    setShow(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (_id, placas, capacity) => {
    const newData = { _id, capacity, placas };

    setId(_id);
    setDatos(newData);
    setShowEdit(true);
  };

  const getAllPipes = async () => {
    try {
      const res = await axios.get(getPipesUrl, {
        headers: { Authorization: localStorage.getItem('TokenKey') },
      });
      const { data } = res;
      setPipes(data.data);
      setBackUpPipes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const alertEmptyInputs = () => {
    handleClose();
    Swal.fire({
      icon: 'warning',
      title: 'Oops',
      text: 'No puedes dejar campos vacios al llenar una pipa',
    });
    datos.capacity = '';
    datos.placas = '';
  };

  const handleSubmitNewPipe = async () => {
    const { capacity, placas } = datos;

    if (capacity === '' || placas === '') {
      alertEmptyInputs();
    } else {
      datos.capacity = Number(capacity);
      setDatos((datos) => ({ ...datos, ...datos.capacity }));

      const res = await axios.post('http://localhost:5050/api/v1/pipes', datos);
      const { data } = res.data;

      handleClose();

      if (res.data.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Pipa agregada correctamente!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setPipes([...pipes, data]);
        });
      }
    }
  };

  useEffect(() => {
    getAllPipes();
  }, []);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const alertSuccesful = (pipeId) => {
    Swal.fire({
      icon: 'success',
      title: 'Pipa eliminada correctamente!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      setPipes(pipes.filter((pipe) => pipe._id !== pipeId));
    });
  };

  const handleDeletePipe = async (pipeId) => {
    const res = await axios.delete(
      'http://localhost:5050/api/v1/pipes/' + pipeId
    );

    if (res.status === 200) {
      alertSuccesful(pipeId);
    }
  };

  const handleEditPipe = async () => {
    const { capacity, placas } = datos;

    if (capacity === '' || placas === '') {
      alertEmptyInputs();
    } else {
      datos.capacity = Number(capacity);
      setDatos((datos) => ({ ...datos, ...datos.capacity }));

      const res = await axios.put(
        'http://localhost:5050/api/v1/pipes/' + id,
        datos
      );
      const { data } = res.data;

      handleCloseEdit();

      if (res.data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Pipa editada correctamente!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          const newData = pipes.map((pipe) => {
            if (pipe._id === data._id) {
              pipe = { ...data };
            }
            return pipe;
          });

          setPipes(newData);
        });
      }
    }
  };

  return (
    <>
      <Container className='mt-4'>
        <Row>
          <Col>
            <h2>Lista de pipas</h2>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='success' onClick={handleShow}>
              Agregar pipa
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Llene la siguiente información</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>Placas</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='XXX-XXX'
                      required
                      onChange={handleOnChange}
                      name='placas'
                      ref={placasRef}
                      value={datos.placas}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Label>Capacidad (en litros)</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='####'
                      required
                      onChange={handleOnChange}
                      name='capacity'
                      ref={capacityRef}
                      value={datos.capacity}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  variant='secondary'
                  type='submit'
                  onClick={handleSubmitNewPipe}
                >
                  Añadir
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Form>
              <Form.Group
                className='mt-3'
                controlId='exampleForm.ControlInput1'
              >
                <input
                  className='form-control me-2'
                  type='search'
                  ref={inputText}
                  onChange={handleOnChangeInput}
                  placeholder='Buscar por placas'
                  aria-label='Search'
                ></input>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Placas</th>
                  <th>Capacidad en Litros</th>
                  <th>Porcentaje almacenado %</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pipes.map(({ _id, placas, percentageWater, capacity }) => {
                  return (
                    <tr key={_id}>
                      <th>{placas}</th>
                      <th>{capacity}</th>
                      <th>{percentageWater}</th>
                      <th>
                        <Button
                          variant='warning'
                          onClick={() => handleShowEdit(_id, placas, capacity)}
                        >
                          Editar
                        </Button>
                      </th>
                      <th>
                        <Button
                          onClick={() => handleDeletePipe(_id)}
                          variant='danger'
                        >
                          Eliminar
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Llene la siguiente información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
              <Form.Label>Placas</Form.Label>
              <Form.Control
                type='text'
                placeholder='XXX-XXX'
                required
                onChange={handleOnChange}
                name='placas'
                ref={placasRef}
                value={datos.placas}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea2'
            >
              <Form.Label>Capacidad (en litros)</Form.Label>
              <Form.Control
                type='number'
                placeholder='####'
                required
                onChange={handleOnChange}
                name='capacity'
                ref={capacityRef}
                value={datos.capacity}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant='warning' type='submit' onClick={handleEditPipe}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
