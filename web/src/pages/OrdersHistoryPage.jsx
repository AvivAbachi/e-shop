import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import orderApi from '../api/orderApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import useRequest from '../hooks/useRequest';
import { Store } from '../Store';
import { getError } from '../utils';

function OrdersHistoryPage() {
	const {
		state: { cart, userInfo },
	} = useContext(Store);
	const navigate = useNavigate();
	const { onFail, onRequest, onSuccess, data: orders, error, loading } = useRequest();

	const addToCartHandler = async (product) => {
		try {
			const quantity = await tryAddToCart(cart, product);
			dispatch({
				type: actions.ADD_TO_CART,
				payload: { ...product, quantity },
			});
			navigate('/cart');
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {
		if (!userInfo) navigate('/signin?redirect=/orders/history');

		const getOrders = async () => {
			onRequest();
			try {
				const { data } = await orderApi.getAllOrders(userInfo.token);
				onSuccess(data);
			} catch (err) {
				onFail(getError(err));
			}
		};
		if (!orders) getOrders();
	}, [navigate, orders, userInfo]);

	return (
		<div>
			<Helmet>
				<title>E Shop - Order</title>
			</Helmet>
			<h1 className='my-3'>Orders History</h1>
			{error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : loading || !orders ? (
				<Loading />
			) : orders.length === 0 ? (
				<MessageBox>
					Your cart is empty. <Link to='/'>Go back to Home Page</Link>
				</MessageBox>
			) : (
				orders.map((order) => (
					<Card key={order._id} className='mb-4'>
						<Card.Header>
							<Row className='justify-content-start gap-2 '>
								<Col md={5} lg='auto'>
									<div className='fw-bold'>Order placed</div>
									<div>{new Date(order.createdAt).toLocaleString('es')}</div>
								</Col>
								<Col md={6} lg='auto'>
									<div className='fw-bold'>Total</div>
									<div>{order.totalPrice.toFixed(2)}</div>
								</Col>
								<Col md={5} lg='auto'>
									<div className='fw-bold'>Ship to</div>
									<div>{`${order.shippingAddress.country}, ${order.shippingAddress.city}, ${order.shippingAddress.address}`}</div>
								</Col>
								<Col md={6} lg={true} className='text-lg-end'>
									<div className='fw-bold'>Order #{order._id}</div>
									<Link to={'/order/' + order._id}>View order details </Link>
								</Col>
							</Row>
						</Card.Header>
						<ListGroup variant='flush'>
							{order.orderItems.map((product) => (
								<ListGroup.Item key={product._id}>
									<Row className='p-1 gap-2 gap-md-0'>
										<Col md='auto'>
											<Link to={'/products/' + product.token}>
												<img width={150} className='d-block mx-auto' src={product.image} />
											</Link>
										</Col>
										<Col>
											<Link to={'/products/' + product.token}>{product.title}</Link>
										</Col>
										<Col md={3} className='d-flex flex-column gap-2'>
											<Button onClick={() => addToCartHandler(product)}>Buy it again</Button>
											<LinkContainer to={'/products/' + product.token}>
												<Button variant='light'>View your item</Button>
											</LinkContainer>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Card>
				))
			)}
		</div>
	);
}

export default OrdersHistoryPage;
