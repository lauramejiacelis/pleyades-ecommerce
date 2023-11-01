import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { saveShippingAddress } from "../slices/cartSlice"

const ShippingScreen = () => {
  const cart = useSelector((state)=> state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country}))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>

      <h2>Envíos</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu dirección de envío"
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-2">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu ciudad"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Código Postal"
            value={postalCode}
            onChange={(e)=> setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>País</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu País"
            value={country}
            onChange={(e)=> setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3 w-100"
          
        >
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen