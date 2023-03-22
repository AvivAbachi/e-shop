import { useLoaderData } from 'react-router-dom';

import productsApi from '../api/productsApi';

function ProductPage() {
	const {
		product: {
			name,
			catagory,
			price,
			id,
			brand,
			description,
			stock,
			rating,
			reviews,
			image,
		},
	} = useLoaderData();

	return (
		<div>
			<h1>{name} </h1>
		</div>
	);
}

export async function productLoader({ params }) {
	const res = await productsApi.getProductById(params.id);
	return { product: res.data };
}

export default ProductPage;
