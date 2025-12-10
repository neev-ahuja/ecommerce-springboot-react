import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OrderSummary } from '../../api/types';

interface OrderState {
    orderSummary: OrderSummary | null;
    shippingCost: number;
}

const initialState: OrderState = {
    orderSummary: null,
    shippingCost: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
            state.orderSummary = action.payload;
        },
        setShippingCost: (state, action: PayloadAction<number>) => {
            state.shippingCost = action.payload;
        },
    },
});

export const { setOrderSummary, setShippingCost } = orderSlice.actions;
export default orderSlice.reducer;
