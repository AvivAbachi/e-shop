import { useEffect, useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';

import productsApi from '../api/productsApi';

function ProductPage() {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		error: '',
		products: {
			name,
			catagory,
			price,
			token,
			brand,
			description,
			stock,
			rating,
			reviews,
			image,
		},
	});

	useEffect(() => {
		const getProducts = async () => {
			dispatch({ type: types.GET_REQUEST });
			try {
				const res = await productsApi.getProductByToken();
				dispatch({ type: types.GET_SUCCESS, payload: res.data });
			} catch (error) {
				dispatch({ type: types.GET_FAIL, payload: error.message });
			}
		};
		getProducts();
	}, []);

	const {
		product: {
			name,
			catagory,
			price,
			token,
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
			<h1>{name}</h1>
			<img src={image} />
		</div>
	);
}

// export async function productLoader({ params }) {
// 	const res = await productsApi.getProductByToken(params.token);
// 	return { product: res.data };
// }

export default ProductPage;
