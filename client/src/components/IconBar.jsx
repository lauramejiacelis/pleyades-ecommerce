import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const IconBar = () => {
  return (
    <div className='iconBar'>
      <Link to={'/'} className='icons'>
        <FaInstagram />
      </Link>

      <Link to={'/'} className='icons'>
        <FaFacebook />
      </Link>

      <Link to={'/'} className='icons'>
        <FaWhatsapp />
      </Link>
    </div>
  );
};

export default IconBar;
