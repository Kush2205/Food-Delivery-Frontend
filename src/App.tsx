// filepath: /d:/Projects/Intern Projects/freotend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Pages/Navbar';
import LandingPage from './components/Pages/LandingPage';
import AuthPage from './components/Pages/AuthPage';
import MenuPage from './components/Pages/MenuPage';
import CheckoutPage from './components/Pages/CheckoutPage';
import OrdrsPage from './components/Pages/OrdrsPage';
function App() {
  return (
    <Router>
      <div className='w-full bg-neutral-900'>
        <Navbar />
        <Routes>
          <Route path="/" element={<><LandingPage />  <div id="auth-section">
          <AuthPage />
        </div></>}/>
          <Route path="/menu" element={<MenuPage />}/>
          <Route path="/checkout" element={<CheckoutPage />}/>
          <Route path="/orders" element={<OrdrsPage />}/>
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;