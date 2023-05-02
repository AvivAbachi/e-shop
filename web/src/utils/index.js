import productsApi from '../api/productsApi';

export const getError = (error) => {
	return error?.message && error.response?.data?.message ? error.response.data.message : error.response;
};

export function round2(num) {
	return Math.round(num * 100 + Number.EPSILON) / 100;
}

export function searchFilter(filter = {}, search = '') {
	const params = new URLSearchParams(search);
	Object.entries(filter).forEach(([name, value]) => {
		if (value) params.set(name, value);
		else if (!value && params.has(name)) params.delete(name);
	});
	if (filter?.page && filter.page == 1) params.delete('page');
	return params.toString();
}

export const tryAddToCart = async (cart, product) => {
	const existedItem = cart.cartItems.find((p) => p._id === product._id);
	const quantity = existedItem ? existedItem.quantity + 1 : 1;
	const { data } = await productsApi.getProductById(product._id);
	if (data.stock < quantity) throw 'Sorry. Product is out of stock';
	return quantity;
};
