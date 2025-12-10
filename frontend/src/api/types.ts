import type { Product } from './mockData';

export type { Product };

export interface Address {
    fullName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    state: string;
    email: string;
    mobileNo: string;
    expressShipping?: boolean;
}

export interface Users {
    // Assuming backend returns these based on RegisterRequest
    id?: number;
    username: string;
    name: string;
    role?: string;
    addresses?: Address[];
}

export interface Orders {
    id: number; // Matches java 'id'
    orderId?: number; // Optional alias if older code uses it
    productList: Product[];
    state: string;
    tracking: string[];
    // payment: any; // Could add payment if needed
}

export interface UpdateUserRequest {
    name: string;
    username: string;
}

export interface AddToCartRequest {
    prodId: number;
}

export interface AddReviewRequest {
    comment: string;
    rating: number;
    prodId: number;
}

// Define the structure of an item in the order summary
export interface OrderSummaryItem {
    product: Product;
    quantity: number;
}

export interface OrderSummary {
    productList: Product[];
    subTotal: number;
    shipping: number;
    tax: number;
    total: number;
}