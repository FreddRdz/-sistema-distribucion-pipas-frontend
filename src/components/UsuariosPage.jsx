import axios from 'axios';
import { useEffect, useState } from 'react';
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

export const UsuariosPage = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [datos, setDatos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleShow = () => {
    datos.firstName = '';
    datos.lastName = '';
    datos.email = '';
    datos.password = '';
    setShow(true);
  };

  const handleClose = () => {
    datos.firstName = '';
    datos.lastName = '';
    datos.email = '';
    datos.password = '';
    setShow(false);
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const alertEmptyInputs = () => {
    handleClose();
    Swal.fire({
      icon: 'warning',
      title: 'Oops',
      text: 'No puedes dejar campos vacios al llenar una pipa',
    });
    datos.firstName = '';
    datos.lastName = '';
    datos.email = '';
    datos.password = '';
  };

  const handleSubmitNewPipe = async () => {
    const { firstName, lastName, email, password } = datos;

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      alertEmptyInputs();
    } else {
      setDatos((datos) => ({ ...datos }));
      console.log(datos);

      const res = await axios.post(
        'https://sistema-nl-agua.herokuapp.com/api/v1/users',
        datos,
        { headers: { Authorization: localStorage.getItem('TokenKey') } }
      );
      const { data } = res.data;

      handleClose();

      if (res.data.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Pipa agregada correctamente!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setUsers([...users, data]);
        });
      }
    }
  };

  const alertSuccesful = (userId) => {
    Swal.fire({
      icon: 'success',
      title: 'Pipa eliminada correctamente!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      setUsers(users.filter((user) => user._id !== userId));
    });
  };

  const handleDeletePipe = async (userId) => {
    try {
      const res = await axios.delete(
        'https://sistema-nl-agua.herokuapp.com/api/v1/users/' + userId,
        { headers: { Authorization: localStorage.getItem('TokenKey') } }
      );
      if (res.status === 200) {
        alertSuccesful(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        'https://sistema-nl-agua.herokuapp.com/api/v1/users',
        {
          headers: { Authorization: localStorage.getItem('TokenKey') },
        }
      );
      const { data } = res;
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Container className='mt-4'>
        <Row>
          <Col>
            <h2>Lista de usuarios</h2>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='success' onClick={handleShow}>
              Agregar usuario
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(({ _id, firstName, lastName, email }) => {
                  return (
                    <tr key={_id}>
                      <th>{firstName}</th>
                      <th>{lastName}</th>
                      <th>{email}</th>
                      <th className='d-flex justify-content-end'>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Llene la siguiente información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInputNombre'
            >
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese el nombre'
                required
                onChange={handleOnChange}
                name='firstName'
                value={datos.firstName}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInputApellidos'
            >
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa los apellidos'
                required
                onChange={handleOnChange}
                name='lastName'
                value={datos.lastName}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInputEmail'
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Ingresa el correo'
                required
                onChange={handleOnChange}
                name='email'
                value={datos.email}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInputPassword'
            >
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingresa la contraseña'
                required
                onChange={handleOnChange}
                name='password'
                value={datos.password}
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
    </>
  );
};
