import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
  const {id: orderId} = useParams()

  const { data:order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

  const payOrderHandler= ()=>{}

  return (
    isLoading ? (
    <Loader/>
    ) : error ? (
      <Message variant='danger'/>
    ) : (
      <>
        <h2>Pedido {order._id}</h2>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Envío</h3>
                <p>
                  <strong>Nombre: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Dirección: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>Enviada el {order.deliveredAt}</Message>
                ): (
                  <Message variant='danger'>Su pedido no ha sido enviado</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Método de Pago</h3>
                <p>
                  <stong>Método: </stong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Pagada el {order.paidAt}</Message>
                ): (
                  <Message variant='danger'>Su pedido no ha sido pagado</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Items del Pedido</h3>
                { order.orderItems.map((item,index)=>(
                  <ListGroup.Item>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty*item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Resumen de la Orden</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Items:</Col>
                  <Col> ${order.itemsPrice} </Col>
                </Row>
                <Row>
                  <Col> Valor del Envío:</Col>
                  <Col> ${order.shippingPrice} </Col>
                </Row>
                <Row>
                  <Col> Impuestos:</Col>
                  <Col> ${order.taxPrice} </Col>
                </Row>
                <Row>
                  <Col> Total:</Col>
                  <Col> ${order.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                { error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={order.orderItems.length ===0}
                  onClick={payOrderHandler}
                >
                  Pagar Pedido
                </Button>
                {/* MARK AS DELIVERED PLACEHOLDER */}
                {isLoading && <Loader/>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </Col>
        </Row>
      </>
    )
  )
}

export default OrderScreen