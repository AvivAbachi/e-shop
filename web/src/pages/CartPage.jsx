import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '../api/productsApi';
import CartItem from '../components/CartItem';
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
		} else {
			dispatch({ type: actions.ADD_TO_CART, payload: { ...item, quantity } });
		}
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
				<title>E Shop - Shopping Cart</title>
			</Helmet>
			<h1>Shopping Cart</h1>
			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<MessageBox>
							Your cart is empty. <Link to='/'>Go back to Home Page</Link>
						</MessageBox>
					) : (
						<Card>
							<Card.Body>
								<Card.Title>Items</Card.Title>
								<ListGroup variant='flush'>
									{cartItems.map((product) => (
										<CartItem
											key={product._id}
											title={product.title}
											image={product.image}
											price={product.price}
											quantity={product.quantity}
											stock={product.stock}
											token={product.token}
											onIncrease={() => updateCartHandler(product, product.quantity + 1)}
											onDecrease={() => updateCartHandler(product, product.quantity - 1)}
											onRemove={() => removeItemHandler(product)}
										/>
									))}
								</ListGroup>
							</Card.Body>
						</Card>
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
