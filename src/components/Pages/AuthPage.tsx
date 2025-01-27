import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../store/Slices/AuthSlice'; // Adjust the import path as necessary
import Popup from '../../ui/Popup';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setToggled = () => {
    setIsLogin(!isLogin);
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/user/login', {
        email: username,
        password: password,
      });
      
      if (response.status === 200) {
        dispatch(setToken(response.data.token)); // Dispatch the token to the authSlice
        navigate('/menu');
      } else {
        setErrorMessage(response.data.error || 'Invalid Credentials');
      }
    } catch (error) {
    
      setErrorMessage(error.response.data.error[0].message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/user/register', {
        name: name,
        email: username,
        password: password,
      });

      if (response.status === 200) {
        
         setErrorMessage('User Created Successfully. Please Login');
      } else {
        setErrorMessage(response.data.error || 'Sign Up Failed');
      }
    } catch (error) {
      
      setErrorMessage(error.response.data.error[0].message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Buttons */}
      <div className='flex flex-col justify-center items-center h-screen bg-neutral-900'>
        <motion.div
          ref={ref}
          className='mb-12 flex flex-col items-center'
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-6xl text-[#3498db] font-bold'>Delicious Finger Licking Food.</h1>
          <h1 className='text-white text-6xl font-bold'>Just for you !</h1>
        </motion.div>
        <div className='bg-neutral-800 w-[500px] h-[500px] rounded-lg relative'>
          <div className='w-full flex '>
            <div onClick={setToggled} className={`w-1/2 cursor-pointer rounded-lg flex justify-center transition-all ${isLogin ? 'border-b-2 font-semibold border-b-blue-400 bg-[#1b222e]' : 'border-b-cyan-100 border-b-[1px]'}`}>
              <button className='text-white text-2xl m-2 cursor-pointer'>Login</button>
            </div>

            <div onClick={setToggled} className={`w-1/2 cursor-pointer transition-all rounded-lg flex justify-center ${!isLogin ? 'border-b-2 font-semibold border-b-blue-400 bg-[#1b222e]' : 'border-b-cyan-100 border-b-[1px]'}`}>
              <button className='text-white cursor-pointer text-2xl p-3'>Sign Up</button>
            </div>
          </div>
          {/* SignUp form */}
          {isLogin ? (
            <form id="SignUpForm" className="tab-content active p-5 mt-10" onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="login-email">
                  Email
                </label>
                <input className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500" onChange={(e) => setUsername(e.target.value)} id="login-email" type="email" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="login-password">
                  Password
                </label>
                <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500" id="login-password" type="password" required />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label className="text-gray-300 text-sm" htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-blue-500 text-sm hover:text-blue-400">Forgot Password?</a>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Login
              </button>
            </form>
          ) : (
            <form id="loginForm" className="tab-content active p-5 mt-6" onSubmit={handleSignUp}>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="signup-name">
                  Name
                </label>
                <input onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500" id="signup-name" type="text" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="signup-email">
                  Email
                </label>
                <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500" id="signup-email" type="email" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="signup-password">
                  Password
                </label>
                <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500" id="signup-password" type="password" required />
              </div>
              <button type="submit" className="w-full mb-2 bg-blue-600 mt-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Sign Up
              </button>
            </form>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-75">
              <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
          {errorMessage && (
            <Popup message={errorMessage} closePopup={() => setErrorMessage('')} />
          )}
        </div>
      </div>
    </>
  );
}

export default AuthPage;