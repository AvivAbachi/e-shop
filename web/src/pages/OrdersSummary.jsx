import { useContext, useEffect, useMemo } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import orderApi from '../api/orderApi';
import CartItem from '../components/CartItem';
import CheckoutSteps from '../components/CheckoutSteps';
import Loading from '../components/Loading';
import SummaryItem from '../components/SummaryItem';
import TextHighlight from '../components/TextHighlight';
import useRequest from '../hooks/useRequest';
import { actions, Store } from '../Store';
import { getError, round2 } from '../utils';

function OrdersSummary() {
	const { loading, onRequest, onSuccess, onFail } = useRequest();
	const { state, dispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const navigate = useNavigate();

	const { itemsPrice, taxPrice, shippingPrice, totalPrice } = useMemo(() => {
		const itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
		const taxPrice = round2(itemsPrice * 0.17);
		const shippingPrice = round2(itemsPrice * (itemsPrice > 50 ? 0.1 : 0.02));
		const totalPrice = itemsPrice + shippingPrice + taxPrice;
		return { itemsPrice, taxPrice, shippingPrice, totalPrice };
	}, [cart.cartItems]);

	const submitOrderHandler = async () => {
		onRequest();
		try {
			const order = {
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
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
								<TextHighlight title='Name: ' text={cart.shippingAddress.fullName} />
								<TextHighlight title='Address: ' text={cart.shippingAddress.address} />
								<TextHighlight title='City: ' text={cart.shippingAddress.city} />
								<TextHighlight title='Country: ' text={cart.shippingAddress.country} />
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Payment</Card.Title>
							<Card.Text>
								<TextHighlight title='Method: ' text={cart.paymentMethod} />
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
								<SummaryItem title='Items' text={`$${itemsPrice.toFixed(2)}`} />
								<SummaryItem title='Shipping' text={`$${shippingPrice.toFixed(2)}`} />
								<SummaryItem title='Tax' text={`$${taxPrice.toFixed(2)}`} />
								<SummaryItem title='Total' text={`$${totalPrice.toFixed(2)}`} strong />
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
