import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const getProducts = async () => await axios.get('api/v1/products/');

const getProductByToken = async (token) => await axios.get(`api/v1/products/${token}`);

export default {
	getProducts,
	getProductByToken,
};
