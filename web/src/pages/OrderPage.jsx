import { useContext, useEffect } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import orderApi from '../api/orderApi';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import SummaryItem from '../components/SummaryItem';
import TextHighlight from '../components/TextHighlight';
import useRequest from '../hooks/useRequest';
import { Store } from '../Store';
import { getError } from '../utils';

function OrderPage() {
	const {
		state: { userInfo },
	} = useContext(Store);
	const { orderId } = useParams();
	const navigate = useNavigate();
	const { onFail, onRequest, onSuccess, data: order, error, loading } = useRequest();

	useEffect(() => {
		if (!userInfo) navigate('/signin?redirect=/order/' + orderId);

		const getOrder = async () => {
			onRequest();
			try {
				const { data } = await orderApi.getOrder(orderId, userInfo.token);
				onSuccess(data);
			} catch (err) {
				onFail(getError(err));
			}
		};
		if (!order || (order._id && orderId !== order._id)) getOrder();
	}, [navigate, order, orderId, userInfo]);

	return (
		<div>
			<Helmet>
				<title>E Shop - Order</title>
			</Helmet>
			{error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : loading || !order ? (
				<Loading />
			) : (
				<div>
					<h1 className='my-3'>Order #{order._id}</h1>
					<Row>
						<Col md={8}>
							<Card className='mb-3'>
								<Card.Body>
									<Card.Title>Shipping</Card.Title>
									<Card.Text>
										<TextHighlight title='Name: ' text={order.shippingAddress.fullName} />
										<TextHighlight
											title='Address: '
											text={`${order.shippingAddress.address},${order.shippingAddress.city} ,${order.shippingAddress.country}`}
										/>
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
										<TextHighlight title='Method: ' text={order.paymentMethod} />
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
											<CartItem
												key={item._id}
												title={item.title}
												image={`../${item.image}`}
												price={item.price}
												quantity={item.quantity}
												stock={item.stock}
												token={item.token}
											/>
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
										<SummaryItem title='Items' text={`$${order.itemsPrice.toFixed(2)}`} />
										<SummaryItem title='Shipping' text={`$${order.shippingPrice.toFixed(2)}`} />
										<SummaryItem title='Tax' text={`$${order.taxPrice.toFixed(2)}`} />
										<SummaryItem title='Order' text={`$${order.totalPrice.toFixed(2)}`} strong />
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
}
export default OrderPage;
