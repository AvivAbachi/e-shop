import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '../api/productsApi';
import MessageBox from '../components/MessageBox';
import { actions, Store } from '../Store';

function CartPage() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const cartItems = state.cart.cartItems;

	async function updateCartHandler(item, quantity) {
		const { data } = await productsApi.getProductById(item._id);

		if (data.stock < quantity) {
			toast.error('Sorry. Product is out of stock');
			return;
		}
		dispatch({ type: actions.ADD_TO_CART, payload: { ...item, quantity } });
	}

	function removeItemHandler(item) {
		dispatch({ type: actions.REMOVE_FROM_CART, payload: item });
	}

	function checkoutHandler() {
		navigate('/signin?redirect=/shipping');
	}

	return (
		<div>
			<Helmet>
				<title>Shopping Cart</title>
			</Helmet>
			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<MessageBox>
							Your cart is empty. <Link to='/'>Go back to Home Page</Link>
						</MessageBox>
					) : (
						<ListGroup>
							{cartItems.map((product) => (
								<ListGroup.Item key={product._id}>
									<Row className='align-items-center'>
										<Col md={4}>
											<img className='img-fluid rounded img-thumbnail' src={product.image} alt={product.title} />{' '}
											<Link to={`/products/${product.token}`}>{product.title}</Link>
										</Col>
										<Col md={3}>
											<Button
												onClick={() => updateCartHandler(product, product.quantity - 1)}
												variant='light'
												disabled={product.quantity === 1}
											>
												<i className='fas fa-minus-circle' />
											</Button>{' '}
											<span>{product.quantity}</span>{' '}
											<Button
												variant='light'
												disabled={product.quantity === product.stock}
												onClick={() => updateCartHandler(product, product.quantity + 1)}
											>
												<i className='fas fa-plus-circle' />
											</Button>
										</Col>
										<Col md={3}>{product.price} $</Col>
										<Col md={2}>
											<Button variant='light' onClick={() => removeItemHandler(product)}>
												<i className='fas fa-trash' />
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>
										Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} Items) : $
										{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
									</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<div className='d-grid'>
										<Button type='button' variant='primary' disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>
											Checkout
										</Button>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
export default CartPage;
