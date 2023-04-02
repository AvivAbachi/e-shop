import { useCallback, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import productsApi from '../api/productsApi';
import useFecth from '../hooks/useFecth';

function ProductPage() {
	const params = useParams();
	const { data, error, loading } = useFecth(productsApi.getProductByToken, params?.token);

	return (
		<div>
			{loading ? (
				<p>loading...</p>
			) : error ? (
				<p>{error}</p>
			) : data ? (
				<div>
					<h1>{data.name}</h1>
					<Row>
						<Col md={6}>
							<img className='img-large' src={`../${data.image}`} alt={data.name} />
						</Col>
						<Col md={3}></Col>
						<Col md={3}></Col>
					</Row>
				</div>
			) : null}
		</div>
	);
}

export default ProductPage;
