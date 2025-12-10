import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchQuery } from '../redux/slices/filterSlice';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
        navigate('/login');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-gray-200/80 bg-background-light/80 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
            <div className="flex items-center gap-8 w-full">
                <div className="flex items-center gap-4 text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="size-6 text-green-600">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_6_319)">
                                <path
                                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7375 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                    fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_319">
                                    <rect fill="white" height="48" width="48"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Enterprise Platform</h2>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a className="text-gray-600 hover:text-green-600 text-sm font-medium leading-normal cursor-pointer" onClick={() => navigate('/')}>Home</a>
                    <a className="text-gray-600 hover:text-green-600 text-sm font-medium leading-normal cursor-pointer" onClick={() => navigate('/')}>Shop</a>
                    <a className="text-gray-600 hover:text-green-600 text-sm font-medium leading-normal cursor-pointer">About</a>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4 py-3">
                <label className="hidden sm:flex flex-col min-w-40 h-10! max-w-sm w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div className="text-gray-400 flex bg-gray-100 items-center justify-center pl-4 rounded-l-lg border-r-0">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                        </div>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-green-600/50 border-none bg-gray-100 h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                    </div>
                </label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/cart')}
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-gray-600 hover:bg-gray-100 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 aspect-square relative"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white text-[10px] font-bold">{cartCount}</span>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-transparent hover:border-green-600 transition-colors"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACLHi41A_exRYa5H8HL5kUSq5ctWB9-ibz-dOzuwM-6GxcXg1cndEngY_Cnp7-YTLehce9mE3sZRoyFH6lx3Q7iaRj6iBP4VgrW3W401cb-gq8yb9aKiSctMHWFrAoPJmszsD-_nwdrCRG-pVwjMHaNg4p93-I3cGtD3EC4w1h8Qt50o98fSdXqGDImQxkQ3Cxvb_KgIbm88x4RFeXrcbcoFvhOGE6_2nmt5yJf9cDMfgliZKq78PSPJ5GlWjAh8AwjnLmOTcV-wHZ")' }}
                            ></button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name || user?.username || 'User'}</p>
                                    </div>
                                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>My Orders</Link>
                                    <Link to="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Addresses</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-2">Login</Link>
                            <Link to="/register" className="text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar;