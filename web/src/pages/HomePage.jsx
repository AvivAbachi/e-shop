import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import productsApi from '../api/productsApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';
import useFecth from '../hooks/useFecth';

function HomePage() {
	const { data: products, error, loading } = useFecth(productsApi.getProducts);

	return (
		<div>
			<Helmet>
				<title>E Shop</title>
			</Helmet>
			<div className='products'>
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
		</div>
	);
}

export default HomePage;
