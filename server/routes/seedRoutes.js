import { Router } from 'express';
import data from '../data.js';
import Product from '../models/ProductModel.js';

const seedRouter = Router();

seedRouter.get('/', async (req, res) => {
	await Product.deleteMany({});
	const products = await Product.insertMany(data.products);
	return res.send({ products });
});

export default seedRouter;
