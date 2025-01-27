import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function OrdrsPage() {
  const [orders, setOrders] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/Order/orders', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedOrder(null);
  };

  return (
    <section className="py-20 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">Your Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-neutral-800 rounded-lg shadow-lg p-6 flex justify-between items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleOrderClick(order)}
            >
              <div>
                <h3 className="text-xl font-bold text-white">Order ID: {order._id}</h3>
                <p className="text-gray-400">Total Amount: ${order.totalAmount}</p>
                <p className="text-gray-400">Status: <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>{order.status}</span></p>
              </div>
              <div>
                <p className="text-gray-400">Items:</p>
                <ul className="text-gray-400">
                  {order.items.map((item) => (
                    <li key={item._id}>Menu ID: {item.menuId}, Quantity: {item.quantity}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isPopupVisible && selectedOrder && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-neutral-800 p-8 w-[400px] h-[400px] rounded-lg shadow-lg text-center flex flex-col justify-center items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Order Details</h3>
            <p className="text-white mb-4">Order ID: {selectedOrder._id}</p>
            <p className="text-white mb-4">Total Amount: ${selectedOrder.totalAmount}</p>
            <p className="text-white mb-4">Status: <span className={`px-2 py-1 rounded ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
            <div className="text-white mb-4">
              <p>Items:</p>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item._id}>Menu ID: {item.menuId}, Quantity: {item.quantity}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default OrdrsPage;