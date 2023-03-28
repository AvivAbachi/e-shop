import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

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
		],
	},
]);

export default router;
