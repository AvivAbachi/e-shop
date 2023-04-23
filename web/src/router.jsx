import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import OrdersSummary from './pages/OrdersSummary';
import PaymantPage from './pages/PaymantPage';
import ProductPage from './pages/ProductPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';

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
			{ path: '/order/:orderId', element: <OrderPage /> },
			{ path: '/profile', element: <div>profile</div> },
			{ path: '/forget-password', element: <div>forget password</div> },
			{ path: '/order/history', element: <div>order history</div> },
			{ path: '*', element: <div>Error</div> },
		],
	},
]);

export default router;
