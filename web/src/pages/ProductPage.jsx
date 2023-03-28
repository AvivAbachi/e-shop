import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import productsApi from '../api/productsApi';
import useFecth from '../hooks/useFecth';

function ProductPage() {
	const params = useParams();

	const [{ loading, error, data }, getData] = useFecth();

	useEffect(() => {
		getData(async () => await productsApi.getProductByToken(params.token));
	}, []);

	if (loading) return <div>loading...</div>;

	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>{data?.name}</h1>
			<img src={data?.image} />
		</div>
	);
}

export default ProductPage;
