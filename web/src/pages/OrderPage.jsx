import { useContext, useEffect, useReducer } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import orderApi from '../api/orderApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import useRequest from '../hooks/useRequest';
import { Store } from '../Store';
import { getError } from '../utils';

const OrderPage = () => {
	const {
		state: { userInfo },
	} = useContext(Store);
	const { orderId } = useParams();
	const naviagte = useNavigate();
	const { onFail, onRequest, onSuccess, data: order, error, loading } = useRequest();

	useEffect(() => {
		if (!userInfo) naviagte('/login');

		const getOrder = async () => {
			onRequest();
			try {
				const { data } = await orderApi.getOrder(orderId, userInfo.token);
				onSuccess(data);
			} catch (err) {
				onFail();
				toast.error(getError(err));
			}
		};

		if (!order) getOrder();
	}, [naviagte, order, orderId, userInfo]);

	if (loading || !order) return <Loading />;
	return (
		<div>
			<Helmet>
				<title>Order</title>
			</Helmet>
			<h1 className='my-3'>Order</h1>
			<Row>
				<Col md={8}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Shipping</Card.Title>
							<Card.Text>
								<strong>Name: </strong> {order.shippingAddress.fullName} <br />
								<strong>Address: </strong> {order.shippingAddress.address},{order.shippingAddress.city} ,{order.shippingAddress.country}
							</Card.Text>
							{order.isDelivered ? (
								<MessageBox variant='success'>Delivered at {order.deliveredAt}</MessageBox>
							) : (
								<MessageBox variant='danger'>Not Delivered</MessageBox>
							)}
						</Card.Body>
					</Card>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Payment</Card.Title>
							<Card.Text>
								<strong>Method: </strong> {order.paymentMethod}
							</Card.Text>
							{order.isPaid ? (
								<MessageBox variant='success'>Paid at {order.paidAt}</MessageBox>
							) : (
								<MessageBox variant='danger'>Not Paid</MessageBox>
							)}
						</Card.Body>
					</Card>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Items</Card.Title>
							<ListGroup variant='flush'>
								{order.orderItems.map((item) => (
									<ListGroup.Item key={item._id}>
										<Row className='align-items-center'>
											<Col md={6}>
												<Link to={`/products/${item.token}`}>
													<img src={'../' + item.image} alt={item.title} className='img-fluid rounded img-thumbnail' />
													<div>{item.title}</div>
												</Link>
											</Col>
											<Col md={3}>
												<span>{item.quantity}</span>
											</Col>
											<Col md={3}>${item.price}</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>Order Summary</Card.Title>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Items</Col>
										<Col>${order.itemsPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>${order.shippingPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col>${order.taxPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong> Order Total</strong>
										</Col>
										<Col>
											<strong>${order.totalPrice.toFixed(2)}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
export default OrderPage;
