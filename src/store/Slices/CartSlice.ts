import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageurl: string;
}

interface CartState {
  cart: CartItem[];
  total: number;
}

const initialState: CartState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
        state.total -= item.price * item.quantity;
      }
    },
    updateTotal(state: CartState) {
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, updateTotal, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;