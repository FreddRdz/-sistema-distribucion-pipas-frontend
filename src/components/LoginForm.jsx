import { useContext } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const postLogin = 'http://localhost:5050/api/v1/auth/login';

export const LoginForm = () => {
  const [datos, setDatos] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (emailValue === '' || passwordValue === '') {
      emailRef.current.style.borderColor = 'red';
      passwordRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: 'No puedes dejar campos vacíos',
      });
    } else {
      postData().then((data) => {
        if (data.status === 200) {
          localStorage.setItem('TokenKey', data.tokenSession);
          login();
          navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Correo o contraseña no coinciden',
          });
        }
      });
    }
  };

  const postData = async () => {
    try {
      const res = await axios.post(postLogin, datos);
      return res.data;
    } catch (error) {
      const { data } = error.response;
      return data.status;
    }
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  return (
    <div className='main-form'>
      <div className='form-login--container'>
        <div>
          <img
            src='https://img.freepik.com/free-vector/people-connecting-puzzle-online-flat-vector-illustration-employees-communicating-remotely-building-relationship-men-women-working-using-social-media-business-cooperation-concept_74855-25228.jpg?w=1480&t=st=1663189359~exp=1663189959~hmac=5fce3613b4988a3465d77177a8b9bc7dc048a633caeb90a0190784a70deec636'
            alt='team work'
            className='img-log'
          />
        </div>
        <div className='main-form-content'>
          <h3 className='title-login-form'>
            Bienvenido al sistema de consulta de agua en Nuevo León
          </h3>
          <p className='text-login-form'>Ingrese sus credenciales</p>
          <form onSubmit={handleSubmit} className='form-container'>
            <label className='form-label'>Correo</label>
            <input
              type='email'
              onChange={handleOnChange}
              name='email'
              ref={emailRef}
              value={datos.email}
              className='input-form'
            />
            <label className='form-label'>Contraseña</label>
            <input
              type='password'
              onChange={handleOnChange}
              name='password'
              ref={passwordRef}
              value={datos.password}
              className='input-form'
            />
            <ColorButton variant='contained' type='submit'>
              Ingresar
            </ColorButton>
          </form>
        </div>
      </div>
    </div>
  );
};
