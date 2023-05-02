import { searchFilter } from '../utils';
import axios from './index';

async function getProducts() {
	return await axios.get('api/v1/products/');
}

async function getProductByToken(token) {
	return await axios.get(`api/v1/products/token/${token}`);
}

async function getProductById(id) {
	return await axios.get(`api/v1/products/${id}`);
}

async function searchProducts(searchUrl) {
	return await axios.get(`api/v1/products/search${searchUrl}`);
}

async function getCategories() {
	return await axios.get('api/v1/products/categories');
}

export default {
	getProducts,
	getProductByToken,
	getProductById,
	searchProducts,
	getCategories,
};
