import { Router } from 'express';

import data from '../data.js';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';

const seedRouter = Router();

seedRouter.get('/', async (req, res) => {
	try {
		await Product.deleteMany({});
		const createdProducts = await Product.insertMany(data.products);

		await User.deleteMany({});
		const createdUsers = await User.insertMany(data.users);

		res.send({ createdProducts, createdUsers });
	} catch (err) {
		console.error(`Failed to seed users/products: ${err.message}`);
	}
});

export default seedRouter;
