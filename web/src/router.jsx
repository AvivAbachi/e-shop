import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import ProductPage, { productLoader } from './pages/ProductPage';

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
				path: 'products/:id',
				element: <ProductPage />,
				loader: productLoader,
			},
		],
	},
]);

export default router;
