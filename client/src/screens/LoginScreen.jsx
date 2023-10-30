import { useState } from "react"
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { PiUserCircleDuotone } from 'react-icons/pi'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const submitHandler = (e)=>{
  e.preventDefault()
  console.log('submit')
}

  return (
    <FormContainer>
      <Container className="text-center">
        <PiUserCircleDuotone style={{color:"#DC7A91", fontSize: "70px"}} />
        <h2>Inicio de Sesión</h2>
        <p>Estamos aqui para ayudarte a creer en la magia</p>
      </Container>
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Log In
        </Button>

      </Form>

      <Row className="py-3">
        <Col>
          Eres nuevo? <Link to='/register'>Registrarme</Link>
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

export default LoginScreen