import axiosClient from './axiosClient';
import type { Users, Product, Orders, UpdateUserRequest, AddReviewRequest, Address, OrderSummary } from './types';

interface CreateOrderResponse {
    orderId: string;
    amount: number;
}


export const userApi = {
    getUser: () => axiosClient.get<Users>('/user'),
    updateUser: (data: UpdateUserRequest) => axiosClient.put<string>('/user', data),
    deleteUser: () => axiosClient.delete<string>('/user'),
    getProducts: () => axiosClient.get<Product[]>('/user/products'),
    getProductById: (prodId: number) => axiosClient.get<Product>(`/user/products/${prodId}`),
    getCart: () => axiosClient.get<Product[]>('/user/cart'),
    addToCart: (prodId: number) => axiosClient.post<string>('/user/cart', { prodId }),
    deleteFromCart: (prodId: number) => axiosClient.delete<string>(`/user/cart/${prodId}`),
    getOrder: (orderId: number) => axiosClient.get<Orders>(`/user/order/${orderId}`),
    order: (shipping: number, subTotal: number) => axiosClient.post<string>('/user/order', { shipping, subTotal }),
    addReview: (data: AddReviewRequest) => axiosClient.post<string>('/user/review', data),
    addAddress: (data: Address) => axiosClient.post<Users>('/user/address', data),
    getOrderSummary: () => axiosClient.get<OrderSummary>('/user/orderSummary'),
    createOrder: (amount: number) => axiosClient.post<CreateOrderResponse>('/create-order', { amount }),
    verifyPayment: (data: any) => axiosClient.post<string>('/verify-payment', data),
    getOrders: () => axiosClient.get<Orders[]>('/user/myorders'),
};
