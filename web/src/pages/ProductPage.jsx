import { useContext, useEffect } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '../api/productsApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import useRequest from '../hooks/useRequest';
import { actions, Store } from '../Store';

function ProductPage() {
	const navigate = useNavigate();
	const { token } = useParams();
	const { state, dispatch } = useContext(Store);
	const { onFail, onSuccess, onRequest, data: product, error, loading } = useRequest();

	const addToCartHandler = async () => {
		const existedItem = state.cart.cartItems.find((x) => x._id === product._id);
		const quantity = existedItem ? existedItem.quantity + 1 : 1;
		const { data } = await productsApi.getProductById(product._id);

		if (data.stock < quantity) {
			toast.error('Product is out of stock');
			return;
		}

		dispatch({ type: actions.ADD_TO_CART, payload: { ...product, quantity } });
		navigate('/cart');
	};

	useEffect(() => {
		const getData = async () => {
			onRequest();
			try {
				const { data } = await productsApi.getProductByToken(token);
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
				<title>E Shop - {product?.title ?? 'Product'}</title>
			</Helmet>
			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : product ? (
				<Row>
					<Col md={6}>
						<img className='img-large' src={`../${product.image}`} alt={product.title} />
					</Col>
					<Col md={3}>
						<ListGroup>
							<ListGroup.Item>
								<Helmet>
									<title>{product.title}</title>
								</Helmet>
								<h1>{product.title}</h1>
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
											<Col>{product.stock > 0 ? <Badge bg='success'>In Stock</Badge> : <Badge bg='danger'>Not in Stock</Badge>}</Col>
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
			) : null}
		</div>
	);
}

export default ProductPage;
