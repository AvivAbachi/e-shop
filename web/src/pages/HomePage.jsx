import { useEffect, useState } from 'react';

import productsApi from '../api/productsApi';
import Product from '../components/Product';

function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			const res = await productsApi.getProducts();
			setProducts(res.data);
		};

		getProducts();
	}, []);

	return (
		<main>
			<h1>Products</h1>
			<div className='list'>
				{products.map((p) => (
					<Product key={p.id} {...p} />
				))}
			</div>
		</main>
	);
}

export default HomePage;
