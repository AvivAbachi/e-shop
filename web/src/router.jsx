import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PaymantPage from './pages/PaymantPage';

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
			{ path: '*', element: <div>Error</div> },
		],
	},
]);

export default router;
