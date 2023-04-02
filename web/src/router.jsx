import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SigninPage from './pages/SigninPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'products/:token',
				element: <ProductPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/signin',
				element: <SigninPage />,
			},
		],
	},
]);

export default router;
