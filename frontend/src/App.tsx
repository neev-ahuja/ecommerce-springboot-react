import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import Addresses from './pages/Addresses';
import Settings from './pages/Settings';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getUser } from './redux/slices/authSlice';

// Wrapper component to handle redirects
const AppContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUser())
        .unwrap()
        .catch((err) => {
          if (err === 401) {
            navigate('/login');
          }
        });
    } else if (location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [dispatch, token, navigate]);

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
