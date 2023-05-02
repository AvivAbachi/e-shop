import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import CartPage from './pages/CartPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import OrdersHistoryPage from './pages/OrdersHistoryPage';
import OrdersSummary from './pages/OrdersSummary';
import PaymantPage from './pages/PaymantPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, path: '/', element: <HomePage /> },
			{ path: '/products/:token', element: <ProductPage /> },
			{ path: '/search', element: <SearchPage /> },
			{ path: '/cart', element: <CartPage /> },
			{ path: '/signin', element: <SigninPage /> },
			{ path: '/signup', element: <SignupPage /> },
			{ path: '/shipping', element: <ShippingAddressPage /> },
			{ path: '/payment', element: <PaymantPage /> },
			{ path: '/placeorder', element: <OrdersSummary /> },
			{ path: '/order/all', element: <OrdersHistoryPage /> },
			{ path: '/order/:orderId', element: <OrderPage /> },
			{ path: '/profile', element: <ProfilePage /> },
			{ path: '/forget-password', element: <ForgetPasswordPage /> },
			{ path: '*', element: <NotFoundPage /> },
		],
	},
]);

export default router;
