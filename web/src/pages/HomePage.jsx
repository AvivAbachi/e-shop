import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import productsApi from '../api/productsApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';
import useRequest from '../hooks/useRequest';

function HomePage() {
	const { data: products, error, loading, onRequest, onSuccess, onFail } = useRequest();

	useEffect(() => {
		const getData = async () => {
			onRequest();
			try {
				const { data } = await productsApi.getProducts();
				onSuccess(data);
			} catch (error) {
				onFail(error.message);
			}
		};
		getData();
	}, []);

	return (
		<div>
			<Helmet>
				<title>E Shop</title>
			</Helmet>
			<h1>Products</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<Row>
					{products?.map((p) => (
						<Col key={p.token} lg={3} md={4} sm={6} className='mb-3'>
							<ProductCard product={p} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
}

export default HomePage;
