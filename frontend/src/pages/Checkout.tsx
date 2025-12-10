import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setOrderSummary as setOrderSummaryAction, setShippingCost as setShippingCostAction } from "../redux/slices/orderSlice";
import { userApi } from "../api/userApi";
import type { Address, OrderSummary, Product } from "../api/types";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState<Address>({
        fullName: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "India",
        state: "Delhi",
        email: "",
        mobileNo: "",
        expressShipping: false
    });

    const [shippingCost, setShippingCost] = useState(50.0);

    const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getUser();
                if (response.data.addresses && response.data.addresses.length > 0) {
                    setAddresses(response.data.addresses);
                    setSelectedAddressIndex(0);
                } else {
                    setShowAddAddress(true);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        const getOrderSummary = async () => {
            try {
                const response = await userApi.getOrderSummary();
                console.log(response.data);
                setOrderSummary(response.data);
                dispatch(setOrderSummaryAction(response.data));
            } catch (error) {
                console.error("Failed to fetch order summary", error);
            }
        }
        fetchUser();
        getOrderSummary();
        getOrderSummary();
        dispatch(setShippingCostAction(shippingCost));
    }, []);

    const handleShippingChange = (cost: number) => {
        setShippingCost(cost);
        dispatch(setShippingCostAction(cost));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = async () => {
        try {
            await userApi.addAddress(newAddress);
            setAddresses(prev => [...prev, newAddress]);
            setSelectedAddressIndex(addresses.length);
            setShowAddAddress(false);
            setNewAddress({
                fullName: "",
                streetAddress: "",
                city: "",
                postalCode: "",
                country: "India",
                state: "Delhi",
                email: "",
                mobileNo: "",
                expressShipping: false
            });
        } catch (error) {
            console.error("Failed to add address", error);
        }
    };


    const handleContinueToPayment = () => {
        navigate('/payment');
    }

    return (
        <div className="bg-slate-50 font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 py-8 md:px-8 lg:px-12 xl:px-20">
                        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                            <div className="grow lg:w-3/5">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-6 justify-between">
                                            <p className="text-slate-900 text-base font-medium leading-normal">Step 2 of 4: Delivery</p>
                                        </div>
                                        <div className="rounded-full bg-slate-200 h-2">
                                            <div className="h-2 rounded-full bg-green-500" style={{ width: '50%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-3">
                                        <div className="flex min-w-72 flex-col gap-2">
                                            <p className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">Delivery Information</p>
                                            <p className="text-slate-500 text-base font-normal leading-normal">Please enter your shipping details below.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-slate-900 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1 pt-2">Shipping Address</h2>

                                        {/* Address List */}
                                        {addresses.length > 0 && !showAddAddress && (
                                            <div className="flex flex-col gap-3">
                                                {addresses.map((addr, idx) => (
                                                    <label key={idx} className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer ${selectedAddressIndex === idx ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-green-500/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="selectedAddress"
                                                            checked={selectedAddressIndex === idx}
                                                            onChange={() => setSelectedAddressIndex(idx)}
                                                            className="form-radio h-5 w-5 text-green-500 mt-1"
                                                        />
                                                        <div className="flex flex-col text-slate-900">
                                                            <span className="font-bold">{addr.fullName}</span>
                                                            <span>{addr.streetAddress}, {addr.city}</span>
                                                            <span>{addr.state}, {addr.postalCode}, {addr.country}</span>
                                                            <span className="text-sm text-slate-500">{addr.email} • {addr.mobileNo}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                                <button onClick={() => setShowAddAddress(true)} className="text-green-600 font-bold self-start mt-2">+ Add New Address</button>
                                            </div>
                                        )}

                                        {/* Add Address Form */}
                                        {showAddAddress && (
                                            <div className="flex flex-col gap-4 border p-4 rounded-lg border-slate-200">
                                                <h3 className="font-bold text-lg">Add New Address</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                                    <div className="flex flex-col md:col-span-2">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Full Name</p>
                                                            <input
                                                                name="fullName"
                                                                value={newAddress.fullName}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="Enter your full name"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col md:col-span-2">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Street Address</p>
                                                            <input
                                                                name="streetAddress"
                                                                value={newAddress.streetAddress}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="123 Main Street"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">City</p>
                                                            <input
                                                                name="city"
                                                                value={newAddress.city}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="Anytown"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Postal Code</p>
                                                            <input
                                                                name="postalCode"
                                                                value={newAddress.postalCode}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="12345"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Country</p>
                                                            <select name="country" value={newAddress.country} onChange={handleInputChange} className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 p-[15px] text-base font-normal leading-normal">
                                                                <option value="India">India</option>
                                                                <option value="United States">United States</option>
                                                                <option value="Canada">Canada</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">State / Province</p>
                                                            <input
                                                                name="state"
                                                                value={newAddress.state}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="State"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Email</p>
                                                            <input
                                                                name="email"
                                                                value={newAddress.email}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="Email"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="flex flex-col flex-1">
                                                            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Mobile No</p>
                                                            <input
                                                                name="mobileNo"
                                                                value={newAddress.mobileNo}
                                                                onChange={handleInputChange}
                                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-green-500/50 border border-slate-300 bg-white focus:border-green-500 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                                                                placeholder="Mobile No"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-4 md:col-span-2">
                                                        <button onClick={handleAddAddress} className="bg-green-500 text-white rounded-lg py-3 px-8 font-bold hover:bg-green-600">Save Address</button>
                                                        {addresses.length > 0 && <button onClick={() => setShowAddAddress(false)} className="text-slate-500 hover:text-slate-700 font-medium">Cancel</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-slate-900 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-1 pt-2">Delivery Options</h2>
                                        <div className="flex flex-col gap-4">
                                            <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer ${shippingCost === 50.0 ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-green-500/50'}`}>
                                                <input
                                                    checked={shippingCost === 50.0}
                                                    onChange={() => handleShippingChange(50.0)}
                                                    className="form-radio h-5 w-5 text-green-500 focus:ring-green-500"
                                                    name="delivery-option" type="radio"
                                                />
                                                <div className="flex-1 grid grid-cols-3 items-center gap-4">
                                                    <p className="font-medium text-slate-900">Standard Shipping</p>
                                                    <p className="text-slate-600">Est. 5-7 business days</p>
                                                    <p className="font-semibold text-slate-900 text-right">Rs 50.0</p>
                                                </div>
                                            </label>
                                            <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer ${shippingCost === 150.0 ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-green-500/50'}`}>
                                                <input
                                                    checked={shippingCost === 150.0}
                                                    onChange={() => handleShippingChange(150.0)}
                                                    className="form-radio h-5 w-5 text-green-500 focus:ring-green-500"
                                                    name="delivery-option" type="radio"
                                                />
                                                <div className="flex-1 grid grid-cols-3 items-center gap-4">
                                                    <p className="font-medium text-slate-900">Express Shipping</p>
                                                    <p className="text-slate-600">Est. 2-3 business days</p>
                                                    <p className="font-semibold text-slate-900 text-right">Rs 150.0</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6">
                                        <a className="flex items-center gap-2 text-green-500 hover:underline" href="#">
                                            <span className="material-symbols-outlined text-xl" data-icon="arrow_back">arrow_back</span>
                                            <span>Back to Cart</span>
                                        </a>
                                        <button className="flex w-full sm:w-auto items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-center text-base font-bold text-white shadow-sm hover:bg-green-700"
                                            onClick={handleContinueToPayment}>Continue to Payment</button>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-2/5">
                                <div className="sticky top-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                                    <h2 className="text-slate-900 text-xl font-bold mb-6">Order Summary</h2>
                                    {orderSummary ? (() => {
                                        const groupedItems = orderSummary.productList?.reduce((acc, product) => {
                                            const existingItem = acc.find(item => item.product.id === product.id);
                                            if (existingItem) {
                                                existingItem.quantity += 1;
                                            } else {
                                                acc.push({ product, quantity: 1 });
                                            }
                                            return acc;
                                        }, [] as { product: Product, quantity: number }[]) || [];

                                        return (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    {groupedItems.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <img
                                                                className="h-16 w-16 rounded-lg object-cover"
                                                                src={item.product.image || "https://via.placeholder.com/64"}
                                                                alt={item.product.name || "Product"}
                                                            />
                                                            <div className="grow">
                                                                <p className="font-medium text-slate-900">{item.product.name}</p>
                                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                                            </div>
                                                            <p className="font-semibold text-slate-900">Rs {((typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price || 0) * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="my-6 h-px bg-slate-200"></div>
                                                <div className="flex flex-col gap-3 text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Subtotal</span>
                                                        <span className="font-medium text-slate-900">Rs {orderSummary.subTotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Shipping</span>
                                                        <span className="font-medium text-slate-900">Rs {shippingCost.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Taxes</span>
                                                        <span className="font-medium text-slate-900">Rs {orderSummary.tax.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <div className="my-6 h-px bg-slate-200"></div>
                                                <div className="flex justify-between text-slate-900 text-lg font-bold">
                                                    <span>Total</span>
                                                    <span>Rs {(orderSummary.subTotal + orderSummary.tax + shippingCost).toFixed(2)}</span>
                                                </div>
                                            </>
                                        );
                                    })() : (
                                        <div className="flex justify-center p-4">
                                            <span>Loading order summary...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
