
import Cart from '../../icons/Cart';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 // Adjust the import path as necessary
import { clearToken } from '../../store/Slices/AuthSlice'; // Adjust the import path as necessary

function Navbar() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/');
  };

  return (
    <>
      <div className='w-full flex justify-between '>
        <div className='p-4 flex'>
          <h1 className='text-white ml-28 text-2xl font-extrabold'>Food Delivery</h1>
        </div>

        <div className='text-white flex mt-5 gap-x-10 justify-between mr-28'>
          <Link to="/menu" className='hover:text-[#3498db] transition-colors'>Menu</Link>
          <a href="#" className='hover:text-[#3498db] transition-colors'>About</a>
          <a href="#" className='hover:text-[#3498db] transition-colors'>Contact</a>
          {token ? (
            <button onClick={handleLogout} className='hover:text-[#3498db] transition-colors flex cursor-pointer'>Logout</button>
          ) : (
            <ScrollLink to="auth-section" smooth={true} duration={500} className='hover:text-[#3498db] transition-colors cursor-pointer'>Login</ScrollLink>
          )}
          <a href='#' className='hover:text-[#3498db] transition-colors'>{<Cart />}</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;