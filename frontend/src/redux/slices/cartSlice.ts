import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import type { Product } from '../../api/types';

interface CartItem {
    productId: string;
    quantity: number;
    product?: Product;
}

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.getCart();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: { productId: string; quantity: number }, { rejectWithValue }) => {
        try {
            const prodId = Number(payload.productId);
            if (isNaN(prodId)) throw new Error('Invalid Product ID');
            const response = await userApi.addToCart(prodId);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to add to cart');
        }
    }
);

export const deleteFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (payload: { productId: string }, { rejectWithValue }) => {
        try {
            const prodId = Number(payload.productId);
            if (isNaN(prodId)) throw new Error('Invalid Product ID');
            const response = await userApi.deleteFromCart(prodId);
            return response.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to remove from cart');
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart: (state, action: PayloadAction<string>) => {
            // Local only - backend does not support remove in provided code
            state.items = state.items.filter((item) => item.productId !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            // Local only - backend does not support update quantity directly
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.productId === productId);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                // Transform Product[] to CartItem[] (group by ID)
                const products = action.payload;
                const itemMap = new Map<string, { quantity: number; product: Product }>();

                products.forEach(p => {
                    const strId = String(p.id);
                    const existing = itemMap.get(strId);
                    if (existing) {
                        existing.quantity += 1;
                    } else {
                        itemMap.set(strId, { quantity: 1, product: p });
                    }
                });

                state.items = Array.from(itemMap.entries()).map(([productId, data]) => ({
                    productId,
                    quantity: data.quantity,
                    product: data.product
                }));
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
