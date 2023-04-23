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

async function searchProduct(page, query, category, price, rating, order) {
	return await axios.get(
		`api/v1/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
	);
}
async function getCategories() {
	return await axios.get('api/v1/products/categories');
}
export default {
	getProducts,
	getProductByToken,
	getProductById,
	searchProduct,
	getCategories,
};
