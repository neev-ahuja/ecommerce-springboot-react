import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart, fetchCart } from '../redux/slices/cartSlice';
import { fetchProducts } from '../redux/slices/productSlice';

const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);

    const { items, selectedProductId, status } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const product = items.find((p) => p.id === selectedProductId);

    useEffect(() => {
        // If loaded and no product found (and not initially idle/loading), redirect
        if (status === 'succeeded' && !product && !selectedProductId) {
            navigate('/');
        }
    }, [status, product, selectedProductId, navigate]);

    if (!product) {
        return (
            <div className="flex h-screen items-center justify-center">
                {status === 'loading' ? <p>Loading...</p> : <p>Product not found.</p>}
            </div>
        );
    }

    const handleAddToCart = async () => {
        await dispatch(addToCart({ productId: product.id, quantity }));
        await dispatch(fetchCart());
    };

    return (
        <div className="font-display bg-white">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <main className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
                            <div className="flex flex-wrap gap-2 p-4 text-sm">
                                <span className="text-slate-500 hover:text-green-600 font-medium leading-normal transition-colors cursor-pointer" onClick={() => navigate('/')}>Home</span>
                                <span className="text-slate-400 font-medium leading-normal">/</span>
                                <span className="text-slate-500 hover:text-green-600 font-medium leading-normal transition-colors cursor-pointer">{product.category}</span>
                                <span className="text-slate-400 font-medium leading-normal">/</span>
                                <span className="text-slate-800 font-medium leading-normal">{product.name}</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-4">
                                <div className="lg:col-span-3 flex flex-col gap-4">
                                    <div
                                        className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl aspect-4/3"
                                        style={{ backgroundImage: `url("${product.image}")` }}
                                    ></div>
                                    <div className="flex overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                                        <div className="flex items-stretch gap-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className={`flex h-full flex-1 flex-col rounded-lg min-w-24 md:min-w-32 cursor-pointer ${i === 1 ? 'border-2 border-green-600' : 'opacity-70 hover:opacity-100 transition-opacity'}`}>
                                                    <div
                                                        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                                                        style={{ backgroundImage: `url("${product.image}")` }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 flex flex-col gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{product.name}</h1>
                                        <p className="text-slate-500 text-base font-normal leading-normal">SKU: {product.sku}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-amber-400">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <span key={s} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: s <= Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                                                ))}
                                            </div>
                                            <span className="text-slate-600 text-sm font-medium">({product.reviews} reviews)</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-base leading-relaxed">
                                        {product.description}
                                    </p>
                                    <div className="text-4xl font-bold text-green-600">${product.price.toFixed(2)}</div>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="color">Color</label>
                                            <select
                                                className="form-select w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:ring-green-600 focus:border-green-600"
                                                id="color" name="color">
                                                <option>Standard</option>
                                                {/* <option>Obsidian Black</option> */}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="text-sm font-medium text-slate-700" htmlFor="quantity">Quantity</label>
                                            <div className="flex items-center rounded-lg border border-slate-300">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="flex items-center justify-center p-2 text-slate-500 hover:text-green-600"
                                                >
                                                    <span className="material-symbols-outlined">remove</span>
                                                </button>
                                                <input
                                                    className="w-12 text-center border-0 bg-transparent text-slate-900 p-2 focus:ring-0"
                                                    id="quantity"
                                                    type="text"
                                                    value={quantity}
                                                    readOnly // make readOnly since we control via buttons
                                                />
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="flex items-center justify-center p-2 text-slate-500 hover:text-green-600"
                                                >
                                                    <span className="material-symbols-outlined">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 pt-4">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-green-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-600/90 transition-colors"
                                        >
                                            <span className="truncate">Add to Cart</span>
                                        </button>
                                        <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-slate-100 text-slate-800 gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 transition-colors">
                                            <span className="material-symbols-outlined">favorite</span>
                                            <span className="truncate">Add to Wishlist</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 mt-8">
                                <div className="border-b border-slate-200">
                                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                        <a className="whitespace-nowrap border-b-2 border-green-600 px-1 py-4 text-sm font-medium text-green-600" href="#">Description</a>
                                        <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700" href="#">Specifications</a>
                                        <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700" href="#">Reviews ({product.reviews})</a>
                                    </nav>
                                </div>
                                <div className="py-6">
                                    <h3 className="text-lg font-bold text-slate-900">Full Product Description</h3>
                                    <div className="mt-4 space-y-4 text-base text-slate-600">
                                        <p>{product.description}</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </div >
    );
};

export default ProductPage;
