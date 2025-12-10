import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import type { Product } from '../../api/types';

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedProductId: string | null;
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
    selectedProductId: null,
};

// Real API call
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await userApi.getProducts();
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedProduct: (state, action: PayloadAction<string>) => {
            state.selectedProductId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
