import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Container } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { PiUserCircleDuotone } from 'react-icons/pi';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { registerSchema } from '../utils/schemas';
import FormInput from '../components/FormInput';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search); //sp =search params
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      delete values.confirmPassword;
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      //console.log(values);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Container className='text-center'>
        <PiUserCircleDuotone style={{ color: '#DC7A91', fontSize: '70px' }} />
        <h2>Regístrate</h2>
        <p>Estamos aqui para ayudarte a creer en la magia</p>
      </Container>

      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <FormInput
              label='Nombre'
              name='name'
              type='text'
              placeholder='Ingresa tu nombre'
            />

            <FormInput
              label='Apellido'
              name='lastname'
              type='text'
              placeholder='Ingresa tu apellido'
            />
            <FormInput
              label='Correo Electrónico'
              name='email'
              type='email'
              placeholder='Ingresa tu email'
            />
            <FormInput
              label='Contraseña'
              name='password'
              type='password'
              placeholder='Ingresa tu Contraseña'
            />
            <FormInput
              label='Confirma tu Contraseña'
              name='confirmPassword'
              type='password'
              placeholder='Confirma tu Contraseña'
            />

            <Button
              type='submit'
              variant='primary'
              className='mt-3 w-100'
              disabled={isLoading}
            >
              Registrarme
            </Button>

            {isLoading && <Loader />}
          </Form>
        )}
      </Formik>

      <Row className='py-3'>
        <Col>
          Ya tienes una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
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

export default RegisterScreen;
