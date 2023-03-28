import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import productsApi from '../api/productsApi';
import Product from '../components/ProductItem';
import useFecth from '../hooks/useFecth';

function HomePage() {
	const [{ loading, error, data }, getData] = useFecth();

	useEffect(() => {
		getData(productsApi.getProducts);
	}, []);

	if (loading) return <div>loading...</div>;

	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Products</h1>
			<Row>
				{data?.map((p) => (
					<Col key={p.token} lg={3} md={4} sm={6} className='mb-3'>
						<Product product={p} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default HomePage;
