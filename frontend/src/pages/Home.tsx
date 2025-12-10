import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProducts, setSelectedProduct } from '../redux/slices/productSlice';
import { addToCart, fetchCart } from '../redux/slices/cartSlice';
import { setCategory, setPriceRange, toggleBrand, resetFilters, setSortBy } from '../redux/slices/filterSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { items: products, status } = useAppSelector((state) => state.products);
    const filters = useAppSelector((state) => state.filters);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    console.log(products);

    const filteredProducts = products.filter(product => {
        if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
        if (filters.category && product.category !== filters.category) return false;
        if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
        if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
        return true;
    }).sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        return 0;
    });

    const handleProductClick = (productId: string) => {
        dispatch(setSelectedProduct(productId));
        navigate('/product');
    };

    const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        await dispatch(addToCart({ productId, quantity: 1 }));
        await dispatch(fetchCart());
    };

    const handleCategoryClick = (category: string | null) => {
        dispatch(setCategory(category));
    };

    const handleBrandToggle = (brand: string) => {
        dispatch(toggleBrand(brand));
    };

    return (
        <div className="font-display bg-background-light text-gray-800">
            <div className="relative flex h-auto min-h-screen w-full flex-col">
                <main className="flex-1">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <aside className="w-full lg:w-64 xl:w-72 shrink-0">
                                <div className="sticky top-28 space-y-6">
                                    <div className="flex h-full flex-col justify-between bg-white rounded-lg border border-gray-200/80 p-4">
                                        <div className="flex flex-col gap-4">
                                            <h1 className="text-gray-900 text-base font-semibold leading-normal">Categories</h1>
                                            <div className="flex flex-col gap-1">
                                                <div
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${filters.category === null ? 'bg-green-500/10' : 'hover:bg-gray-100 group'}`}
                                                    onClick={() => handleCategoryClick(null)}
                                                >
                                                    <span className={`material-symbols-outlined ${filters.category === null ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'}`} style={{ fontSize: '20px' }}>widgets</span>
                                                    <p className={`${filters.category === null ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'} text-sm font-semibold leading-normal`}>All Products</p>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${filters.category === 'Electronics' ? 'bg-green-500/10' : 'hover:bg-gray-100 group'}`}
                                                    onClick={() => handleCategoryClick('Electronics')}
                                                >
                                                    <span className={`material-symbols-outlined ${filters.category === 'Electronics' ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'}`} style={{ fontSize: '20px' }}>laptop_chromebook</span>
                                                    <p className={`${filters.category === 'Electronics' ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'} text-sm font-medium leading-normal`}>Electronics</p>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${filters.category === 'Office Supplies' ? 'bg-green-500/10' : 'hover:bg-gray-100 group'}`}
                                                    onClick={() => handleCategoryClick('Office Supplies')}
                                                >
                                                    <span className={`material-symbols-outlined ${filters.category === 'Office Supplies' ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'}`} style={{ fontSize: '20px' }}>edit</span>
                                                    <p className={`${filters.category === 'Office Supplies' ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'} text-sm font-medium leading-normal`}>Office Supplies</p>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${filters.category === 'Furniture' ? 'bg-green-500/10' : 'hover:bg-gray-100 group'}`}
                                                    onClick={() => handleCategoryClick('Furniture')}
                                                >
                                                    <span className={`material-symbols-outlined ${filters.category === 'Furniture' ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'}`} style={{ fontSize: '20px' }}>chair</span>
                                                    <p className={`${filters.category === 'Furniture' ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'} text-sm font-medium leading-normal`}>Furniture</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex h-full flex-col justify-between bg-white rounded-lg border border-gray-200/80 p-4 space-y-6"
                                        style={{ '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')" } as React.CSSProperties}
                                    >
                                        <div className="space-y-4">
                                            <h2 className="text-gray-900 text-base font-semibold leading-normal">Filters</h2>
                                            <div>
                                                <p className="text-gray-800 text-sm font-medium leading-normal mb-2">Price Range</p>
                                                <div className="relative flex w-full flex-col items-start justify-between gap-3">
                                                    <div className="flex h-[38px] w-full pt-1.5">
                                                        <div className="flex h-1 w-full rounded-full bg-gray-200 relative">
                                                            <div className="absolute left-0 top-0 h-full bg-green-600" style={{ width: '100%' }}></div>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="2000"
                                                                value={filters.maxPrice}
                                                                onChange={(e) => dispatch(setPriceRange({ min: 0, max: Number(e.target.value) }))}
                                                                className="absolute w-full h-1 opacity-0 cursor-pointer"
                                                            />
                                                            <div className="absolute top-2 w-full flex justify-between">
                                                                <span className="text-xs text-gray-600">$0</span>
                                                                <span className="text-xs text-gray-600">${filters.maxPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 text-sm font-medium leading-normal mb-2">Brands</p>
                                                <div className="space-y-1">
                                                    {['Innovate Inc.', 'Apex Solutions', 'Quantum Tech', 'Nexus Corp'].map(brand => (
                                                        <label key={brand} className="flex gap-x-3 py-2 flex-row items-center cursor-pointer">
                                                            <input
                                                                checked={filters.brands.includes(brand)}
                                                                onChange={() => handleBrandToggle(brand)}
                                                                className="h-5 w-5 rounded border-gray-400 bg-transparent text-green-600 checked:bg-green-600 checked:border-green-600 checked:bg-[image:--checkbox-tick-svg] focus:ring-2 focus:ring-offset-0 focus:ring-offset-background-light focus:ring-green-600/50"
                                                                type="checkbox"
                                                            />
                                                            <p className="text-gray-700 text-sm font-normal leading-normal">{brand}</p>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => dispatch(resetFilters())}
                                                className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-gray-600 hover:bg-gray-100 text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
                                            >
                                                <span className="truncate">Clear All</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-baseline pb-6 border-b border-gray-200/80">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                        {filters.category || 'All Products'}
                                    </h1>
                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <div className="relative inline-block text-left">
                                            <button
                                                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                                onClick={() => dispatch(setSortBy(filters.sortBy === 'price-desc' ? 'price-asc' : 'price-desc'))}
                                            >
                                                Sort by: {filters.sortBy === 'price-desc' ? 'Price High-Low' : filters.sortBy === 'price-asc' ? 'Price Low-High' : 'Price'}
                                                <span className="material-symbols-outlined -mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" style={{ fontSize: '20px' }}>expand_more</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
                                    {status === 'loading' ? (
                                        <div className="col-span-full py-10 text-center text-gray-500">Loading products...</div>
                                    ) : filteredProducts.length === 0 ? (
                                        <div className="col-span-full py-10 text-center text-gray-500">No products found.</div>
                                    ) : (
                                        filteredProducts.map(product => (
                                            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-all hover:shadow-lg cursor-pointer" onClick={() => handleProductClick(product.id)}>
                                                <div className="aspect-square overflow-hidden">
                                                    <img
                                                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col space-y-2 p-4">
                                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                                    <p className="text-lg font-semibold text-gray-900">Rs {product.price.toFixed(2)}</p>
                                                    <div className="flex flex-1 items-end">
                                                        <button
                                                            onClick={(e) => handleAddToCart(e, product.id)}
                                                            className="w-full flex items-center justify-center rounded-lg bg-green-600/10 text-green-600 px-4 py-2 text-sm font-bold hover:bg-green-600 hover:text-white transition-colors"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <nav className="flex items-center justify-between border-t border-gray-200/80 px-4 sm:px-0 mt-10 pt-6">
                                    <div className="flex w-0 flex-1">
                                        <a className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href="#">
                                            <span className="material-symbols-outlined mr-3 h-5 w-5" style={{ fontSize: '20px' }}>arrow_back</span>
                                            Previous
                                        </a>
                                    </div>
                                    <div className="hidden md:flex">
                                        <a aria-current="page" className="inline-flex items-center border-t-2 border-green-600 px-4 pt-3 text-sm font-medium text-green-600" href="#">1</a>
                                    </div>
                                    <div className="flex w-0 flex-1 justify-end">
                                        <a className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href="#">
                                            Next
                                            <span className="material-symbols-outlined ml-3 h-5 w-5" style={{ fontSize: '20px' }}>arrow_forward</span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
