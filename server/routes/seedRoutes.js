import { Router } from 'express';

import data from '../data.js';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';

const seedRouter = Router();

seedRouter.get('/', async (req, res) => {
	console.log('Start Seeding...');
	console.log('Seeding Products');
	await Product.deleteMany({});
	const createdProducts = await Product.insertMany(data.products);
	console.log('Seeding Users');
	await User.deleteMany({});
	const createdUsers = await User.insertMany(data.users);
	console.log('Done!');
	res.send({ createdProducts, createdUsers });
});

export default seedRouter;
