import { Carousel, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const UsScreen = () => {
  return (
    <main>
      <Carousel pause='hover' className='bg-secondary mb-4'>
        <Carousel.Item>
          <Image src='/images/slide1.png' alt='Velas esferas' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h5>Velas en esferas</h5>
            <p>Perfectas para regalos especiales</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src='/images/slide2.png' alt='Velas esferas' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h5>Velas Personalizadas</h5>
            <p>Fabricadas bajo pedido</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src='/images/slide3.png' alt='Velas esferas' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h5>Velas en lata</h5>
            <p>Con intención</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src='/images/slide4.png' alt='Velas esferas' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h5>Velas en esferas</h5>
            <p>Perfectas para regalos especiales</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <section className='w-75 mx-auto text-center pt-5'>
          <p className='pt-3 fs-5 border-top border-3'>Somos</p>
          <div
            className=' d-inline-block align-items-center justify-content-center fs-2'
            id='pleyades'
          >
            <div className=' d-inline-block align-items-center justify-content-center text-info'>
              <div className='text-center pleyades'>PLEYADES</div>
              <div className='text-center pleyades'> {`{Magia y Luz}`} </div>
            </div>
          </div>
          <p className='p-2 fs-5'>
            Estamos convencidos de que el planeta será un lugar mejor, si
            siempre regalas{' '}
            <span className='text-secondary'>un poco de tu luz al mundo…</span>
          </p>
          <p className='p-2 fs-5'>
            Creemos en que todos tenemos un guía interior, sabiduría y magia…
            Queremos darte las herramientas para hacer tus pequeños y grandes
            rituales,{' '}
            <span className='text-secondary'>
              {' '}
              para conectar contigo y encontrar tu mejor versión...
            </span>
          </p>
        </section>

        <section className='w-75 mx-auto text-center pt-5'>
          <h2 className='p-3 fs-2 border-top border-3'>
            Equipo pequeño con{' '}
            <span className='text-secondary'> resultados grandes!!!</span>
          </h2>
          <p class='p-3 fs-5'>
            Cada uno de nuestros productos es trabajado artesanalmente con mucho{' '}
            <span className='text-secondary'> amor</span>
          </p>
          <Image src='/images/vendervelasonline.jpg' alt='emprendedores' />
        </section>
      </Container>
    </main>
  );
};

export default UsScreen;
