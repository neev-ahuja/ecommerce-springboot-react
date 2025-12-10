import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { userApi } from '../api/userApi';
import type { Address } from '../api/types';
import { getUser } from '../redux/slices/authSlice';

const Addresses: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<Address>({
        fullName: '',
        email: '',
        mobileNo: '',
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        expressShipping: false
    });
    const [loading, setLoading] = useState(false);

    // Refresh user data to get addresses if not present or stale
    // However, usually we rely on user state being fresh from app load.
    // If we want to be sure, we can re-fetch.

    const addresses = user?.addresses || [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userApi.addAddress(formData);
            await dispatch(getUser()); // Refresh user data to show new address
            setIsAdding(false);
            setFormData({
                fullName: '',
                email: '',
                mobileNo: '',
                country: '',
                streetAddress: '',
                city: '',
                state: '',
                postalCode: '',
                expressShipping: false
            });
        } catch (error) {
            console.error('Failed to add address', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Addresses</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                    {isAdding ? 'Cancel' : 'Add New Address'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border">
                    <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="mobileNo"
                            placeholder="Mobile Number"
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="streetAddress"
                            placeholder="Street Address"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded md:col-span-2"
                        />
                        <input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded"
                        />
                        <div className="md:col-span-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="expressShipping"
                                    checked={formData.expressShipping}
                                    onChange={handleInputChange}
                                />
                                <span>Express Shipping available</span>
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Address'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {addresses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No addresses saved yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addresses.map((address, index) => (
                        <div key={index} className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition relative">
                            <h3 className="font-bold text-lg mb-2">{address.fullName}</h3>
                            <p className="text-gray-600 text-sm mb-1">{address.streetAddress}</p>
                            <p className="text-gray-600 text-sm mb-1">{address.city}, {address.state} {address.postalCode}</p>
                            <p className="text-gray-600 text-sm mb-3">{address.country}</p>
                            <div className="text-sm text-gray-500">
                                <p>Phone: {address.mobileNo}</p>
                                <p>Email: {address.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Addresses;
