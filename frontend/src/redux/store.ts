import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        filters: filterReducer,
        cart: cartReducer,
        auth: authReducer,
        order: orderReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
