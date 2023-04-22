import express from 'express';

import Product from '../models/ProductModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
	const products = await Product.find();
	res.send(products);
});

productRouter.get('/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product was not found' });
	}
});

productRouter.get('/token/:token', async (req, res) => {
	const product = await Product.findOne({ token: req.params.token });
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product was not found' });
	}
});

export default productRouter;
