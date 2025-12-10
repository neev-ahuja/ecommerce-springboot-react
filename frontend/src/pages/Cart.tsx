import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, updateQuantity, addToCart, fetchCart, deleteFromCart } from '../redux/slices/cartSlice';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Selectors
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartStatus = useAppSelector((state) => state.cart.status);
    const allProducts = useAppSelector((state) => state.products.items);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // Derived State
    const cartProducts = cartItems.map(item => {
        // Prefer product from cart item if available (from fetchCart), fallback to allProducts lookup (for local updates if any)
        const product = item.product || allProducts.find(p => p.id === item.productId);
        return {
            ...item,
            product
        };
    }).filter(item => item.product !== undefined); // specific filter to ensure product exists

    const subtotal = cartProducts.reduce((sum, item) => {
        return sum + (item.product!.price * item.quantity);
    }, 0);

    const taxEstimate = subtotal * 0.065; // Example 6.5% tax
    const grandTotal = subtotal + taxEstimate; // Shipping is calculated later

    // Recommendations (simple logic: show products not in cart)
    const recommendations = allProducts
        .filter(p => !cartItems.some(item => item.productId === p.id))
        .slice(0, 4);

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };

    const handleRemoveItem = async (productId: string) => {
        await dispatch(deleteFromCart({ productId }));
        await dispatch(fetchCart());
    };

    const handleAddToCart = async (productId: string) => {
        await dispatch(addToCart({ productId, quantity: 1 }));
        await dispatch(fetchCart());
    };

    if (cartStatus === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-xl font-medium text-slate-600">Loading your cart...</div>
            </div>
        );
    }



    return (
        <div className="bg-slate-50 font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-slate-500 hover:text-green-700 text-sm font-medium leading-normal cursor-pointer" onClick={() => navigate('/')}>Home</span>
                                    <span className="text-slate-500 text-sm font-medium leading-normal">/</span>
                                    <span className="text-slate-900 text-sm font-medium leading-normal">Shopping Cart</span>
                                </div>
                            </div>
                            <div className="mb-8">
                                <div className="flex flex-wrap justify-between gap-3">
                                    <div className="flex min-w-72 flex-col gap-2">
                                        <p className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">Your Cart</p>
                                        <p className="text-slate-500 text-base font-normal leading-normal">You have {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in your cart. Review and proceed to checkout.</p>
                                    </div>
                                </div>
                            </div>

                            {cartProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-slate-200">
                                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shopping_cart_off</span>
                                    <p className="text-xl text-slate-600 font-medium mb-6">Your cart is empty</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
                                            <table className="w-full">
                                                <thead className="bg-slate-50">
                                                    <tr className="border-b border-slate-200">
                                                        <th className="px-6 py-3 text-left text-slate-600 w-2/5 text-xs font-semibold uppercase tracking-wider">Product</th>
                                                        <th className="px-6 py-3 text-left text-slate-600 w-1/5 text-xs font-semibold uppercase tracking-wider">Price</th>
                                                        <th className="px-6 py-3 text-left text-slate-600 w-1/5 text-xs font-semibold uppercase tracking-wider">Quantity</th>
                                                        <th className="px-6 py-3 text-right text-slate-600 w-1/5 text-xs font-semibold uppercase tracking-wider">Total</th>
                                                        <th className="w-10"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200">
                                                    {cartProducts.map(({ productId, quantity, product }) => (
                                                        <tr key={productId}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-4">
                                                                    <div
                                                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-16 h-16"
                                                                        style={{ backgroundImage: `url("${product!.image}")` }}
                                                                    ></div>
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-slate-900">{product!.name}</p>
                                                                        <p className="text-xs text-slate-500">SKU: {product!.sku}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Rs {product!.price.toFixed(2)}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        className="w-16 text-center rounded-md border-slate-300 bg-white focus:ring-green-700 focus:border-green-700 text-slate-900"
                                                                        type="number"
                                                                        min="1"
                                                                        value={quantity}
                                                                        onChange={(e) => handleQuantityChange(productId, parseInt(e.target.value) || 1)}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-900">
                                                                Rs {(product!.price * quantity).toFixed(2)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                                <button
                                                                    onClick={() => handleRemoveItem(productId)}
                                                                    className="text-slate-500 hover:text-red-500"
                                                                >
                                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <a className="flex items-center gap-2 text-sm font-medium text-green-700 hover:underline cursor-pointer" onClick={() => navigate('/')}>
                                                <span className="material-symbols-outlined text-xl">arrow_back</span>
                                                Continue Shopping
                                            </a>
                                            {/* <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg">Update Cart</button> */}
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1">
                                        <div className="sticky top-28">
                                            <div className="rounded-lg border border-slate-200 bg-white p-6">
                                                <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <p className="text-slate-500">Subtotal</p>
                                                        <p className="text-slate-900 font-medium">Rs {subtotal.toFixed(2)}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-slate-500">Shipping</p>
                                                        <p className="text-slate-900 font-medium">Calculated at next step</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-slate-500">Taxes (Est. 6.5%)</p>
                                                        <p className="text-slate-900 font-medium">Rs {taxEstimate.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="border-t border-slate-200 my-4"></div>
                                                <div className="flex justify-between items-baseline mb-6">
                                                    <p className="text-lg font-bold text-slate-900">Grand Total</p>
                                                    <p className="text-xl font-bold text-slate-900">Rs {grandTotal.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-end gap-2 mb-6">
                                                    <div className="grow">
                                                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="promo-code">Promo Code</label>
                                                        <input
                                                            className="w-full text-sm rounded-md border-slate-300 bg-white focus:ring-green-700 focus:border-green-700 text-slate-900"
                                                            id="promo-code" placeholder="Enter code" type="text"
                                                        />
                                                    </div>
                                                    <button className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 hover:bg-green-700/10 rounded-lg h-[42px]">Apply</button>
                                                </div>
                                                <button
                                                    onClick={() => navigate('/checkout')}
                                                    className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700/90 transition-colors"
                                                >
                                                    Proceed to Checkout <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {recommendations.length > 0 && (
                                <div className="mt-20">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {recommendations.map(product => (
                                            <div key={product.id} className="border border-slate-200 rounded-xl overflow-hidden group bg-white">
                                                <div
                                                    className="bg-center bg-no-repeat aspect-square bg-cover"
                                                    style={{ backgroundImage: `url("${product.image}")` }}
                                                ></div>
                                                <div className="p-4">
                                                    <h4 className="font-semibold text-slate-900">{product.name}</h4>
                                                    <p className="text-sm text-slate-500 mt-1">Rs {product.price.toFixed(2)}</p>
                                                    <button
                                                        onClick={() => handleAddToCart(product.id)}
                                                        className="mt-4 w-full text-sm font-bold py-2 px-4 rounded-lg bg-green-700/10 text-green-700 hover:bg-green-700/20 transition-colors"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Cart;
