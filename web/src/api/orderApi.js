import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getOrder(orderId, token) {
	return await axios.get(`/api/v1/orders/${orderId}`, { headers: { authorization: `Bearer ${token}` } });
}
async function createOrder({ orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }, token) {
	return await axios.post(
		'/api/v1/orders',
		{ orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice },
		{ headers: { authorization: `Bearer ${token}` } }
	);
}

export default {
	getOrder,
	createOrder,
};
