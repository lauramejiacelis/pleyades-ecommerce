import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Header from './components/Header'
import IconBar from './components/IconBar'

const App = () => {
  return (
    <>
      <Header/>
      <IconBar/>
      <NavBar/>
      <main className='py-3'>
        <Container>
          <Outlet/>

        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App