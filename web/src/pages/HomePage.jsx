import { useReducer } from 'react';
import { useEffect } from 'react';

import productsApi from '../api/productsApi';
import Product from '../components/Product';

const types = {
	GET_REQUEST: 'GET_REQUEST',
	GET_SUCCESS: 'GET_SUCCESS',
	GET_FAIL: 'GET_FAIL',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case types.GET_REQUEST:
			return { ...state, loading: true };
		case types.GET_SUCCESS:
			return { ...state, products: payload, loading: false };
		case types.GET_FAIL:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
};

function HomePage() {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		error: '',
		products: [],
	});

	useEffect(() => {
		const getProducts = async () => {
			dispatch({ type: types.GET_REQUEST });
			try {
				const res = await productsApi.getProducts();
				dispatch({ type: types.GET_SUCCESS, payload: res.data });
			} catch (error) {
				dispatch({ type: types.GET_FAIL, payload: error.message });
			}
		};
		getProducts();
	}, []);

	if (state.loading) return <div>loading...</div>;

	if (state.error) return <div>{state.error}</div>;

	return (
		<main>
			<h1>Products</h1>
			<div className='list'>
				{state.products.map((p) => (
					<Product key={p.id} {...p} />
				))}
			</div>
		</main>
	);
}

export default HomePage;
