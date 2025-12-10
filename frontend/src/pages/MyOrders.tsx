import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import type { Orders } from '../api/types';

const MyOrders: React.FC = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await userApi.getOrders();
                console.log('MyOrders response:', response.data);
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Expected array of orders but got:', response.data);
                    setOrders([]);
                }
            } catch (err) {
                setError('Failed to load orders.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-10">Loading orders...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">You have no orders yet.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-2 gap-2">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                                    <p className="text-xs text-green-600 font-medium">{order.state}</p>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {(order.tracking && order.tracking.length > 0) && (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Tracking: {order.tracking.join(', ')}</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {order.productList && Object.values(order.productList.reduce((acc, product) => {
                                    if (!acc[product.id]) {
                                        acc[product.id] = { ...product, quantity: 0 };
                                    }
                                    acc[product.id].quantity += 1;
                                    return acc;
                                }, {} as Record<number, typeof order.productList[0] & { quantity: number }>)).map((product, idx) => (
                                    <div key={`${order.id}-${product.id}-${idx}`} className="flex items-center gap-4">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.brand || 'Product'}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">No Img</div>
                                            )}
                                            {product.quantity > 1 && (
                                                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm z-10">
                                                    {product.quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-gray-500">{product.brand}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                            {product.quantity > 1 && (
                                                <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
