import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import orderApi from '../api/orderApi';
import CartItem from '../components/CartItem';
import CheckoutSteps from '../components/CheckoutSteps';
import Loading from '../components/Loading';
import SummaryItem from '../components/SummaryItem';
import useRequest from '../hooks/useRequest';
import { actions, Store } from '../Store';
import { getError, round2 } from '../utils';

function OrdersSummary() {
	const { onFail, onRequest, onSuccess, data, error, loading } = useRequest();
	const { state, dispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const navigate = useNavigate();

	const submitOrderHandler = async () => {
		onRequest();
		try {
			const order = {
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			};
			const { data } = await orderApi.createOrder(order, userInfo.token);
			onSuccess();
			dispatch({ type: actions.CLEAR_CART });
			navigate(`/order/${data.order._id}`);
		} catch (err) {
			onFail();
			toast.error(getError(err));
		}
	};

	cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
	cart.taxPrice = round2(cart.itemsPrice * 0.17);
	cart.shippingPrice = cart.itemsPrice > 50 ? round2(cart.itemsPrice * 0.1) : round2(cart.itemsPrice * 0.02);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	useEffect(() => {
		if (!cart.paymentMethod) navigate('/payment');
	}, [navigate, cart.paymentMethod]);

	return (
		<div>
			<Helmet>
				<title>E Shop - Orders Summary</title>
			</Helmet>
			<CheckoutSteps step1 step2 step3 step4 />
			<h1 className='my-3'>Orders Summary</h1>
			<Row>
				<Col md={8}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Shipping</Card.Title>
							<Card.Text>
								<strong>Name: </strong>
								{cart.shippingAddress.fullName}
								<br />
								<strong>Address: </strong>
								{cart.shippingAddress.address}
								<br />
								<strong>City: </strong>
								{cart.shippingAddress.city}
								<br />
								<strong>Country: </strong>
								{cart.shippingAddress.country}
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Payment</Card.Title>
							<Card.Text>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</Card.Text>
							<Link to='/payment'>Edit</Link>
						</Card.Body>
					</Card>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Items</Card.Title>
							<ListGroup variant='flush'>
								{cart.cartItems.map((product) => (
									<CartItem
										key={product._id}
										title={product.title}
										image={product.image}
										price={product.price}
										quantity={product.quantity}
										stock={product.stock}
										token={product.token}
									/>
								))}
							</ListGroup>
							<Link to='/cart'>Edit</Link>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Order Summary</Card.Title>
							<ListGroup variant='flush'>
								<SummaryItem title='Items' text={`$${cart.itemsPrice.toFixed(2)}`} />
								<SummaryItem title='Shipping' text={`$${cart.shippingPrice.toFixed(2)}`} />
								<SummaryItem title='Tax' text={`$${cart.taxPrice.toFixed(2)}`} />
								<SummaryItem title='Total' text={`$${cart.totalPrice.toFixed(2)}`} strong />
								<ListGroup.Item>
									<div className='d-grid'>
										<Button type='button' onClick={submitOrderHandler} disabled={cart.cartItems.length === 0}>
											Submit
										</Button>
									</div>
									{loading && <Loading />}
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
export default OrdersSummary;
