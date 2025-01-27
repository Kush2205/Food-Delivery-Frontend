import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './Slices/CartSlice';
import authSlice from './Slices/AuthSlice'; 
import ordersSlice from './Slices/OrdersSlice';
const store = configureStore({
    reducer: {
        cart : cartSlice,
        auth : authSlice,
        orders : ordersSlice

    }
})

export default store;