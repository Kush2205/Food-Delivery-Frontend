import { useState } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageurl: string;
}
import { useDispatch, useSelector } from 'react-redux';

import { incrementQuantity, decrementQuantity, removeFromCart } from '../../store/Slices/CartSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state:any) => state.cart);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

  const calculateSubtotal = () => {
    return cart.cart.reduce((acc :any, item : any) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // Assuming a 10% tax rate
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  const handleCheckout = async () => {
    interface CartItem {
      id: string;
      title: string;
      price: number;
      quantity: number;
      imageurl: string;
    }

    interface OrderDetails {
      items: {
        menuId: string;
        quantity: number;
      }[];
      totalAmount: string;
      status: string;
    }

    const orderDetails: OrderDetails = {
      items: cart.cart.map((item: CartItem) => ({
        menuId: item.id,
        quantity: item.quantity,
      })),
      totalAmount: total.toFixed(2),
      status: 'pending',
    };

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/Order/order', orderDetails, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        setOrderId("#"+response.data._id);
        setIsPopupVisible(true);
        
      } else {
        console.error('Failed to register order');
      }
    } catch (error) {
      console.error('Error registering order:', error);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    navigate('/orders');
  };

  return (
    <section id="cart" className="py-20 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-white animate__animated animate__fadeInDown">Your Cart</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <motion.div
            className="lg:w-2/3 animate__animated animate__fadeInLeft"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {cart.cart.map((item: CartItem) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center justify-between p-4 border-b border-neutral-700"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        style={{
                          backgroundImage: `url(${item.imageurl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                        className="bg-neutral-700 w-20 h-20 rounded-lg flex items-center justify-center"
                      ></div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title + ` x ${item.quantity}`}</h3>
                        <p className="text-gray-400">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-neutral-700 rounded-lg">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="px-3 py-1 text-white hover:bg-neutral-600"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-neutral-700 text-white">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="px-3 py-1 text-white hover:bg-neutral-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <div className="lg:w-1/3 animate__animated animate__fadeInRight">
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && (
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
            <div className="absolute -top-8 mt-12 left-1/2 transform -translate-x-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#c8e6c9" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path>
                <polyline
                  fill="none"
                  stroke="#4caf50"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                  points="14,24 21,31 36,16"
                ></polyline>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 mt-8">Order placed successfully</h3>
            <p className="text-white mb-4">Order ID: {orderId}</p>
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

export default CheckoutPage;