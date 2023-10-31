import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { PiUserCircleDuotone } from 'react-icons/pi'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-toastify'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo }= useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search) //sp =search params
  const redirect = sp.get('redirect') || '/'

  useEffect(()=> {
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo, redirect, navigate])

  const submitHandler = async (e)=>{
    e.preventDefault()

    if (password !== confirmPassword){
      toast.error('las contraseñas no coinciden')
    } else {
      try {
        const res = await register({name, lastname, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <FormContainer>
      <Container className="text-center">
        <PiUserCircleDuotone style={{color:"#DC7A91", fontSize: "70px"}} />
        <h2>Regístrate</h2>
        <p>Estamos aqui para ayudarte a creer en la magia</p>
      </Container>
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastname" className="my-2">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            value={lastname}
            onChange={(e)=> setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-2">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-2">
          <Form.Label>Confirma tu Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3 w-100"
          disabled= { isLoading }
        >
          Registrarme
        </Button>

        { isLoading &&  <Loader/>}

      </Form>

      <Row className="py-3">
        <Col>
          Ya tienes una cuenta? <Link to={ redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
        </Col>
      </Row>
      <Row >
        <Col>
          <Link to='/'>Volver a la pagina de inicio</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen