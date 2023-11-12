import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { PiUserCircleDuotone } from 'react-icons/pi';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search); //sp =search params
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Container className='text-center'>
        <PiUserCircleDuotone style={{ color: '#DC7A91', fontSize: '70px' }} />
        <h2>Inicio de Sesión</h2>
        <p>Estamos aqui para ayudarte a creer en la magia</p>
      </Container>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type='email'
            placeholder='Ingresa tu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='mt-3 w-100'
          disabled={isLoading}
        >
          Log In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Eres nuevo?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Registrarme
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to='/'>Volver a la pagina de inicio</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
