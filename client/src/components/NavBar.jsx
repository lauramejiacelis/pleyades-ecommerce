import { Badge, Navbar, Nav, Container} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import logo from '../assets/Pleyades_ecommerce.png';

const NavBar = () => {
  const { cartItems } = useSelector((state)=>state.cart);
  console.log(cartItems)

  return (
    <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className="text-light fs-1 d-flex align-items-center">
            <img src={logo} alt='Pleyades' height={100} className="d-inline-block"/>
            <div className=" d-inline-block align-items-center justify-content-center">
              <div className="text-center pleyades">PLEYADES</div> 
              <div className="text-center pleyades"> {`{Magia y Luz}`}  </div>
            </div>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic/navbar/nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link > 
                <FaShoppingCart/> Cart 
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='info' style={{marginLeft: '5px'}}>
                      {cartItems.reduce((acc, curr)=> acc + curr.qty ,0)}
                    </Badge>
                  )
                }
              </Nav.Link>
            </LinkContainer>
              
            <LinkContainer to='/login'>
              <Nav.Link> <FaUser/> Sign In </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar