import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

import CheckoutButton from '../../ui/CheckoutButton';
import axios from 'axios';


function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  
  const token = useSelector((state : any) => state.auth.token);

  const getMenu = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/Menu/menu', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getMenu();
    }
  }, [token]);

  
  const handleCloseForm = () => {
    setIsEditFormVisible(false);
  };

  if (!token) {
    return <div className="text-white text-center mt-10">Unauthorized</div>;
  }

  return (
    <>
      <div className="menu-page">
        <h1 className="text-white text-4xl text-center mt-10">Menu</h1>
        <div className="menu-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
          {menuItems.map((item : any) => (
            <MenuItem
              key={item._id}
              id={item._id}
              title={item.name}
              price={item.price}
              imageurl={item.imageUrl}
              description={item.description}
             
            />
          ))}
        </div>
        {isEditFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
              <button onClick={handleCloseForm} className="text-white mb-4">Close</button>
             
            </div>
          </div>
        )}
        <CheckoutButton />
      </div>
    </>
  );
}

export default MenuPage;