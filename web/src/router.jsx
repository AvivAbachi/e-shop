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

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, path: '/', element: <HomePage /> },
			{ path: 'products/:token', element: <ProductPage /> },
			{ path: '/cart', element: <CartPage /> },
			{ path: '/signin', element: <SigninPage /> },
			{ path: '/signup', element: <SignupPage /> },
			{ path: '/shipping', element: <ShippingAddressPage /> },
			{ path: '/payment', element: <PaymantPage /> },
			{ path: '/placeorder', element: <OrdersSummary /> },
			{ path: '/order/:orderId', element: <OrderPage /> },
			{ path: '*', element: <div>Error</div> },
		],
	},
]);

export default router;
