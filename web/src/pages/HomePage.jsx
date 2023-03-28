import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import productsApi from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import useFecth from '../hooks/useFecth';

function HomePage() {
	const [{ loading, error, data }, getData] = useFecth();

	useEffect(() => {
		getData(productsApi.getProducts);
	}, []);

	return (
		<div>
			<h1>Products</h1>
			<Row>
				{loading ? (
					<p>loading...</p>
				) : error ? (
					<p>{error}</p>
				) : (
					data?.map((p) => (
						<Col key={p.token} lg={3} md={4} sm={6} className='mb-3'>
							<ProductCard product={p} />
						</Col>
					))
				)}
			</Row>
		</div>
	);
}

export default HomePage;
