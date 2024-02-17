import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import cartIcon from '../../assets/images/9073722_cart_icon.svg';
import { useStoreContext } from '../../Context/store';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useStoreContext();
  return (
    <div className='header flex'>
      <h1
        className='link'
        onClick={() => {
          navigate('/');
        }}>
        TreRex Store
      </h1>
      <div className='flex'>
        <a
          className={`link ${location.pathname === '/' ? 'link-active' : ''} `}
          onClick={() => {
            navigate('/');
          }}>
          Products
        </a>
        <a
          className={`link ${
            location.pathname === '/cart' ? 'link-active' : ''
          } `}
          onClick={() => {
            navigate('/cart');
          }}>
          <img className='cart-icon' src={cartIcon} alt='' />
          {Boolean(cartItems.length) && <span>{cartItems.length}</span>}
        </a>
      </div>
    </div>
  );
};

export default Header;
