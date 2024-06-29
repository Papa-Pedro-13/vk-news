import { Link } from 'react-router-dom';
import { FaVk } from 'react-icons/fa';

const Header = () => {
  return (
    <div className={'header'}>
      <div className='container'>
        <Link to={'/'}>
          <FaVk size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
