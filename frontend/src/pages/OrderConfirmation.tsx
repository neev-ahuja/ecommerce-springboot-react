
const OrderConfirmation = () => {
    return (
        <div className="font-display">
            <div className="relative flex min-h-screen w-full flex-col bg-slate-50 group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 sm:px-10 lg:px-20 py-3 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-4 text-slate-900">
                            <div className="size-6 text-green-600">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">EnterprisePlatform</h2>
                        </div>
                        <div className="hidden md:flex flex-1 justify-end gap-8">
                            <div className="flex items-center gap-9">
                                <a className="text-slate-900 text-sm font-medium leading-normal" href="#">Dashboard</a>
                                <a className="text-slate-900 text-sm font-medium leading-normal" href="#">Products</a>
                                <a className="text-green-600 text-sm font-bold leading-normal" href="#">Orders</a>
                                <a className="text-slate-900 text-sm font-medium leading-normal" href="#">Help</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-600 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                    <span className="material-symbols-outlined text-xl">notifications</span>
                                </button>
                                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-600 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                    <span className="material-symbols-outlined text-xl">settings</span>
                                </button>
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                    data-alt="User avatar image"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvLGNiJxVm6Q8ohIt7K4rpTaLms1-2sZ4H4rOUBKs4hh4fVXrDqZdVjuGslgu3RHMyzxGRufAsDgRo7MCJyFcN-xHTrgd3r_feldYm6s_TcKKDFnRgLUPerECGp627oCYxt9GmqghovasfXpUGgEKB2djXzWGFZ7q8jxNBRTYN5oWzJRBVLYxkf9zK3NOBxgKGzzTSDSWNkvQGjeCOT_AZPBR3uFPnC05HrD7AmEUhVeOITKJ5Grugm8y07ISuS1VwdTb3MNctIggc")' }}
                                ></div>
                            </div>
                        </div>
                    </header>
                    <main className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-10 sm:py-16">
                        <div className="layout-content-container flex flex-col max-w-5xl flex-1 gap-8">
                            <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
                                <div className="flex items-center justify-center size-16 rounded-full bg-green-50 text-green-600">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>check_circle</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">Thank you for your order!</h1>
                                    <p className="text-slate-600 text-base font-normal leading-normal max-w-lg">
                                        Your order <span className="font-semibold text-slate-800">#A1B2-C3D4-E5F6</span> has been successfully placed. A confirmation email with all the details has been sent to your registered address.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 mt-4">
                                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-green-600 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-green-700 transition-colors">
                                        <span>Track Order</span>
                                    </button>
                                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-6">
                                        <span>Continue Shopping</span>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-white p-6 rounded-xl border border-slate-200">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 flex flex-col gap-6">
                                        <div className="flex flex-col gap-3">
                                            <h2 className="text-slate-900 text-[22px] font-bold leading-tight tracking-[-0.015em]">Order Summary</h2>
                                            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-slate-50">
                                                            <th className="px-6 py-3 text-left text-slate-600 w-1/2 sm:w-2/4 text-sm font-medium leading-normal">Product</th>
                                                            <th className="px-6 py-3 text-center text-slate-600 w-1/4 sm:w-1/4 text-sm font-medium leading-normal">Quantity</th>
                                                            <th className="px-6 py-3 text-right text-slate-600 w-1/4 sm:w-1/4 text-sm font-medium leading-normal">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-t border-slate-200">
                                                            <td className="h-auto p-6 w-1/2 sm:w-2/4 text-slate-900 text-sm font-medium leading-normal align-top">High-Capacity Server Rack</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-center align-top">1</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-right align-top">$1,200.00</td>
                                                        </tr>
                                                        <tr className="border-t border-slate-200">
                                                            <td className="h-auto p-6 w-1/2 sm:w-2/4 text-slate-900 text-sm font-medium leading-normal align-top">Enterprise Network Switch</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-center align-top">2</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-right align-top">$850.00</td>
                                                        </tr>
                                                        <tr className="border-t border-slate-200">
                                                            <td className="h-auto p-6 w-1/2 sm:w-2/4 text-slate-900 text-sm font-medium leading-normal align-top">Cloud Data Subscription (1 Year)</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-center align-top">1</td>
                                                            <td className="h-auto p-6 w-1/4 sm:w-1/4 text-slate-600 text-sm font-normal leading-normal text-right align-top">$5,000.00</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="w-full md:w-1/2 flex flex-col gap-3">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-slate-600 text-sm">Subtotal</p>
                                                    <p className="text-slate-900 text-sm">$6,050.00</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-slate-600 text-sm">Shipping</p>
                                                    <p className="text-slate-900 text-sm">$50.00</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-slate-600 text-sm">Taxes</p>
                                                    <p className="text-slate-900 text-sm">$488.00</p>
                                                </div>
                                                <div className="border-t border-slate-200 my-2"></div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-slate-900 text-base font-bold">Total</p>
                                                    <p className="text-slate-900 text-lg font-bold">$6,588.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white p-6 rounded-xl flex flex-col gap-4 border border-slate-200">
                                            <h3 className="text-slate-900 font-bold text-base">Shipping Address</h3>
                                            <div className="text-slate-600 text-sm leading-relaxed">
                                                <p>Alex Doe</p>
                                                <p>123 Innovation Drive</p>
                                                <p>Suite 450</p>
                                                <p>Tech City, TX 75001</p>
                                                <p>United States</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-xl flex flex-col gap-4 border border-slate-200">
                                            <h3 className="text-slate-900 font-bold text-base">Payment Method</h3>
                                            <div className="flex items-center gap-3">
                                                <img alt="Visa logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABXe9Zhl6KfqGTYCYlrMs-utZNWnynaYpBtEfBgED38g3zubh8nEdqwQxx8w6VzeCH4ottx48TMznQvsp5LppmTfr7pUEd71B43ldwf9oN2i2Sqp3dkY9V2s6v6-Sdn-kACR4mYZAmeaR9t38Gnq6yyeWbxFYL7H3i6LVAN3ipA6t2FIpuqnORA4AcizzMeKufkZMm-pnSz6J1M39VshGLChPz_43023PWRmOeRpQSVVSppSQqBcqHzZwTCK5bHjpqU_0wnLBekktl" />
                                                <p className="text-slate-600 text-sm">Visa ending in 1234</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-xl flex flex-col gap-4 border border-slate-200">
                                            <h3 className="text-slate-900 font-bold text-base">Shipping Method</h3>
                                            <p className="text-slate-600 text-sm">Standard Ground (5-7 business days)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
