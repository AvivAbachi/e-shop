import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const getProducts = async () => await axios.get('api/v1/products/');

const getProductById = async (id) => await axios.get(`api/v1/products/${id}`);

export default {
	getProducts,
	getProductById,
};
