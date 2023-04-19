import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import { StoreProvider } from './Store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StoreProvider>
			<HelmetProvider>
				<RouterProvider router={router} />
			</HelmetProvider>
		</StoreProvider>
	</React.StrictMode>
);
