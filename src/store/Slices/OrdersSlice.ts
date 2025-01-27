import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  menuId: string;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  totalAmount: string;
  status: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [
    {
      items: [
        {
          menuId: '',
          quantity: 0,
        },
      ],
      totalAmount: '',
      status: '',
    },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;