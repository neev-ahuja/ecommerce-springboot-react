import { useAppSelector } from "../redux/hooks";
import type { Product } from "../api/types";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const Payment = () => {
    const { orderSummary, shippingCost } = useAppSelector(state => state.order);

    const groupedItems = orderSummary?.productList?.reduce((acc, product) => {
        const existingItem = acc.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ product, quantity: 1 });
        }
        return acc;
    }, [] as { product: Product, quantity: number }[]) || [];



    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!orderSummary) return;

        const totalAmount = (orderSummary.subTotal || 0) + (orderSummary.tax || 0) + shippingCost;

        try {
            const { data: orderData } = await userApi.createOrder(totalAmount);

            const options = {
                key: "YOUR_KEY", // Enter the Key ID generated from the Dashboard
                amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "E-Commerce",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderData.orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (response: any) {
                    try {
                        await userApi.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            shipping: shippingCost.toString(),
                            subtotal: orderSummary.subTotal.toString()
                        });
                        alert("Payment Successful");
                        navigate('/order-success'); // Or wherever you want to redirect
                    } catch (error) {
                        alert("Payment verification failed");
                        console.error(error);
                    }
                },
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();

        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to initiate payment");
        }
    }

    return (
        <div className="bg-slate-50 font-display">
            <div className="relative flex min-h-screen w-full flex-col">
                <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <a className="text-zinc-500 text-sm font-medium hover:text-green-600" href="#">Shipping</a>
                                <span className="text-zinc-400 text-sm font-medium">/</span>
                                <span className="text-zinc-800 text-sm font-bold">Payment</span>
                                <span className="text-zinc-400 text-sm font-medium">/</span>
                                <a className="text-zinc-500 text-sm font-medium" href="#">Confirmation</a>
                            </div>
                            <p className="text-zinc-900 text-4xl font-black tracking-tighter">Payment Information</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-zinc-900 text-xl font-bold tracking-tight">Select a Payment Method</h2>
                                        <div className="flex flex-col gap-3">
                                            <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all selected border-green-600 shadow-[0_0_0_1px_#16a34a]">
                                                <input
                                                    defaultChecked
                                                    className="mt-1 h-5 w-5 border-2 border-zinc-300 bg-transparent text-green-600 focus:ring-green-600 focus:ring-offset-white"
                                                    name="payment_method" type="radio"
                                                />
                                                <div className="flex grow flex-col">
                                                    <p className="text-zinc-900 font-medium">Credit / Debit Card</p>
                                                    <p className="text-sm text-zinc-600">Pay securely with your card.</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <img className="h-6 w-auto" data-alt="Visa logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgrQc6da1jQ8dw4MqmlWLbolacD1cLNhVxJK5qUM2xNO6irrTBK3owbLXJQ5Y_vz7S6iBceYwuA8SOiyvQnpEE_SSRC9PvW_OXz_lFcMZe0PM09TREnk4SBDodm2Rvq6D_a_gGnYpbwA6DzDhpIUqJecbLqs0j6rIhEFX64vqEqb02vtCJu80D4kcBop6xwnzS7D0FUKAsb8V66qN4Q7_iuwGnNqXDtYoHl6zOb3_KDJJvvZO41GOWDLxiUTeszq_R3B7nDHVk_lnB" alt="Visa" />
                                                    <img className="h-6 w-auto" data-alt="Mastercard logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnKEq0Q_LhY4tDaypebRccEL0sbdrZGZYpRWf_n5VdeHxFJkYzCc7XjquslMGsXphiYUh2MMQwUlcQOCTHfngH4hcrsHUzidV2kmyGxETa7pHhCLl32NW60fg_7svzan6_vLssqtPelQbSXsqwAIC7hIzMdQJql6qZFNS7LyirJ6zE6TqUgBf7APm3GWo5CNkwCFivfNfHqu0fBiUyeY0SZZqej_-8sEuwWrrg2Ptbo5lp7Wl7XAS6Zco8jzhiNx_soK_8a-dhmuiJ" alt="Mastercard" />
                                                    <img className="h-6 w-auto" data-alt="American Express logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApC9X5kr2xEhmJukYb40odJpBuqlxKjW4CTu8x_nFa0uEdGFCVeb-kUm1hZr2GFu9YMlybCxHEOYpeRL70T7Nb__4vM5I8uvXbPiWFojSnS1eX6ZDNR43koZhYVQPvLIYZjrekos1pzi1AxXgIR0AfpY7INmsCi9GOootHDjjoEYVjAFp_W_kbytIadUy29SNr3K6SUbP8qdUDWpGXdQUFBh7y75ly5dJYoFRKUJ4FdWYDM7XOpD-924s5GLtfBBCCBQsmqF9BW-M2" alt="Amex" />
                                                </div>
                                            </label>
                                            <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 border-zinc-200 p-4 transition-all">
                                                <input
                                                    className="mt-1 h-5 w-5 border-2 border-zinc-300 bg-transparent text-green-600 focus:ring-green-600 focus:ring-offset-white"
                                                    name="payment_method" type="radio"
                                                />
                                                <div className="flex grow flex-col">
                                                    <p className="text-zinc-900 font-medium">PayPal</p>
                                                    <p className="text-sm text-zinc-600">Checkout via your PayPal account.</p>
                                                </div>
                                                <img className="h-6 w-auto" data-alt="PayPal logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlKIKomJakQHWr4dHyfOURle6zsAMnWjujH-LujukQmmcxSW-CGz0vvf0uLdo3lirYcNg3awVP5-JOBti2NOsNmdOYrj9E8pYYCYXf1bwuk-esaNnZMcDg5AanbN3BmtM4fc5R_8znz-FBZAN9ast3bBb91QJsKpLLRaWrKPU6nWQSZ9T934TezOyBkbulnaUHgJ24rhYvrdJsjBfgl_ciEWDMSx6AH0Zw6vtpeawyIC2tOztZo8QjOV13C5T66QJ0SY7Tej74OvKS" alt="PayPal" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-zinc-900 text-xl font-bold tracking-tight">Billing Address</h2>
                                        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4">
                                            <input defaultChecked className="h-5 w-5 rounded border-zinc-300 bg-transparent text-green-600 focus:ring-green-600 focus:ring-offset-white" id="same-address-checkbox" type="checkbox" />
                                            <label className="text-sm font-medium text-zinc-900" htmlFor="same-address-checkbox">Billing address is the same as shipping address</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="sticky top-8 space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-zinc-900 text-xl font-bold tracking-tight">Order Summary</h2>
                                    <div className="space-y-4">
                                        {groupedItems.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <img
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                    src={item.product.image || "https://via.placeholder.com/64"}
                                                    alt={item.product.name}
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-zinc-800">{item.product.name}</p>
                                                    <p className="text-sm text-zinc-600">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-zinc-800">Rs {((typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price || 0) * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-zinc-200 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm text-zinc-600">
                                            <span>Subtotal</span>
                                            <span>Rs {orderSummary?.subTotal.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-zinc-600">
                                            <span>Shipping</span>
                                            <span>Rs {shippingCost.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-zinc-600">
                                            <span>Taxes</span>
                                            <span>Rs {orderSummary?.tax.toFixed(2) || "0.00"}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-zinc-200 pt-4">
                                        <div className="flex justify-between font-bold text-zinc-900">
                                            <span>Total (estimate)</span>
                                            {/* Note: Shipping is currently managed in local state of Checkout. Need to decide if it should be in Redux too. For now showing subtotal + tax */}
                                            <span>Rs {((orderSummary?.subTotal || 0) + (orderSummary?.tax || 0) + shippingCost).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-green-600/90 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:ring-offset-2"
                                        onClick={handlePlaceOrder}>
                                        Place Order
                                    </button>
                                    <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        Your payment information is encrypted and secure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-auto">
                    <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">© 2024 EnterpriseLogo. All rights reserved.</p>
                        <div className="flex items-center gap-4 text-sm">
                            <a className="text-zinc-500 hover:text-green-600" href="#">Terms of Service</a>
                            <a className="text-zinc-500 hover:text-green-600" href="#">Privacy Policy</a>
                            <a className="text-zinc-500 hover:text-green-600" href="#">Contact Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Payment;
