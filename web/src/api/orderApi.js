import axios from '.';

async function getOrder(orderId, token) {
	return await axios.get(`/api/v1/orders/${orderId}`, { headers: { authorization: token } });
}

async function getAllOrders(token) {
	return await axios.get('/api/v1/orders/all', { headers: { authorization: token } });
}

async function createOrder({ orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }, token) {
	return await axios.post(
		'/api/v1/orders',
		{ orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice },
		{ headers: { authorization: token } }
	);
}

export default {
	getOrder,
	getAllOrders,
	createOrder,
};
//`Bearer ${token}`
