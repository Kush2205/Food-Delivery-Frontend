interface CheckoutButtonProps {
    quantity?: number;
    onClick?: () => void;
}

import Arrow from '../icons/Arrow Right';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function CheckoutButton(props: CheckoutButtonProps) {
    const navigate = useNavigate();
    var quantity: number = 0

    const cart = useSelector((state: any) => state.cart);
    console.log(cart)
    cart.cart.map((item: any) => { quantity += item.quantity })
    return (
        <>
            {quantity > 0 && (
                <motion.div className='w-[300px] rounded-tr-xl rounded-bl-xl flex bg-[#1872ae] justify-center items-center p-4 fixed bottom-0 right-0 m-4' initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <h1 className='text-white text-2xl transition-all'>{quantity} items added</h1>
                    <button onClick={() => { navigate('/checkout') }} className='text-white mt-1 ml-3 cursor-pointer'><Arrow /></button>
                </motion.div>
            )}
        </>
    )
}

export default CheckoutButton