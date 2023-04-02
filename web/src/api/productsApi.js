import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getProducts() {
	return await axios.get('api/v1/products/');
}

async function getProductByToken(token) {
	return await axios.get(`api/v1/products/token/${token}`);
}

async function getProductById(id) {
	return await axios.get(`api/v1/products/${id}`);
}

export default {
	getProducts,
	getProductByToken,
	getProductById,
};
