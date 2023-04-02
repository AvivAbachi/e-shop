import { useCallback, useContext, useEffect } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import productsApi from '../api/productsApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import useFecth from '../hooks/useFecth';
import { Store } from '../Store';

function ProductPage() {
	const navigate = useNavigate();
	const params = useParams();

	const {
		data: product,
		error,
		loading,
	} = useFecth(productsApi.getProductByToken, params?.token);

	const { state, dispatch } = useContext(Store);

	const addToCartHandler = async () => {
		const existedItem = state.cart.cartItems.find((x) => x._id === product._id);
		const quantity = existedItem ? existedItem.quantity + 1 : 1;
		const { data } = await productsApi.getProductById(product._id);

		if (data.stock < quantity) {
			window.alert('Product is out of stock');
			return;
		}

		dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });

		navigate('/cart');
	};

	return (
		<div>
			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : product ? (
				<div>
					<Row>
						<Col md={6}>
							<img className='img-large' src={`../${product.image}`} alt={product.name} />
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<Helmet>
										<title>{product.name}</title>
									</Helmet>
									<h1>{product.name}</h1>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating rating={product.rating} totalReviews={product.totalReviews} />
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: <p className='lead'>{product.description}</p>
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<Card>
								<Card.Body>
									<ListGroup variant='flush'>
										<ListGroup.Item>
											<Row>
												<Col>Price:</Col>
												<Col>${product.price}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>Status:</Col>
												<Col>
													{product.stock > 0 ? (
														<Badge bg='success'>In Stock</Badge>
													) : (
														<Badge bg='danger'>Not in Stock</Badge>
													)}
												</Col>
											</Row>
										</ListGroup.Item>

										{product.stock > 0 && (
											<ListGroup.Item>
												<div className='d-grid'>
													<Button onClick={addToCartHandler} variant='primary'>
														Add to cart
													</Button>
												</div>
											</ListGroup.Item>
										)}
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			) : null}
		</div>
	);
}

export default ProductPage;
