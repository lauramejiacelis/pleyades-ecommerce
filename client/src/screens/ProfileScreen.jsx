import { useState, useEffect } from 'react'
import { Button, Row, Col, Table, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaTimes } from 'react-icons/fa'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const { userInfo }= useSelector((state) => state.auth)

  const [updateProfile, {isLoading: loadingUpdateProfile}]= useProfileMutation()

  const {data: orders, isLoading, error} = useGetMyOrdersQuery()

  useEffect(()=>{
    if(userInfo){
      setName(userInfo.name)
      setLastname(userInfo.lastname)
      setEmail(userInfo.email)
    }
  },[userInfo, userInfo.name, userInfo.email, userInfo.lastname])

  const submitHandler = async (e)=>{
    e.preventDefault()
    if( password !== confirmPassword){
      toast.error('Las contraseñas no coinciden')
    } else {
      try {
        const res = await updateProfile({ _id:userInfo._id, name, lastname, email, password}).unwrap()
        dispatch(setCredentials(res))
        toast.success('Perfil actualizado')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Perfil de Usuario</h2>

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
          
        >
          Actualizar Perfil
        </Button>
        { loadingUpdateProfile && <Loader/>}
        </Form>
      </Col>

      <Col md={9}>
        <h2>Mis Pedidos</h2>
        {isLoading ? (
          <Loader/>
          ) : error ? (
          <Message variant='danger'>
            { error?.data?.message || error.error}
          </Message>) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>PAGADO</th>
                <th>DESPACHADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order)=> (
                <tr key={order._id}>
                  <td> {order._id}  </td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    { order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{color: 'red'}}/>
                    ) }
                  </td>
                  <td>
                    { order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{color: 'red'}}/>
                    ) }
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='info'>
                        Detalles
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

      
      </Col>
    </Row>
  )
}

export default ProfileScreen