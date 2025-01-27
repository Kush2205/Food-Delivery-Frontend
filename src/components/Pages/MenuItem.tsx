import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateTotal } from '../../store/Slices/CartSlice';
import { motion } from 'framer-motion';
import Edit from '../../icons/Edit';

const MenuItem = (props : any) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state : any) => state.cart);

  const addCart = () => {
    dispatch(addToCart({id : props.id, title: props.title, price: props.price, quantity: quantity, imageurl: props.imageurl }));
    dispatch(updateTotal());
    console.log(cart);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-neutral-950 w-[400px] rounded-lg border-[1px] border-gray-500 shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-1s">
        <div className="bg-neutral-200 h-48 flex items-center justify-center">
          <img src={props.imageurl} alt={props.title} className="object-cover h-full w-full" />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl text-white font-semibold mb-2">{props.title}</h3>
            <button aria-label="Edit" className="text-white" onClick={props.onEditClick}>
              <Edit />
            </button>
          </div>
          <p className="text-white mb-4">{props.description}</p>
          <div className="flex justify-between text-white items-center mb-4">
            <span className="text-white font-bold text-xl">${props.price}</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 text-center text-black"
              min="1"
            />
          </div>
          <button
            onClick={addCart}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;