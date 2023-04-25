import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/ProductModel.js';

const productRouter = express.Router();
const PAGE_SIZE = 6;

productRouter.get('/', async (req, res) => {
	const products = await Product.find();
	res.send(products);
});

productRouter.get(
	'/categories',
	expressAsyncHandler(async (req, res) => {
		try {
			const categories = await Product.find().distinct('category');
			res.send(categories);
		} catch (error) {
			res.status(500).send();
		}
	})
);

productRouter.get(
	'/search',
	expressAsyncHandler(async (req, res) => {
		try {
			const pageSize = Number(req.query.pageSize) || PAGE_SIZE;
			const page = Number(req.query.page) || 1;
			const category = req.query.category;
			const price = req.query.price;
			const rating = Number(req.query.rating);
			const order = req.query.order || 'newest';
			const searchQuery = req.query.query;

			if (page < 1 || pageSize < 1) {
				throw new Error('Invalid page or page size');
			}

			const filters = {};
			if (searchQuery) {
				filters.title = { $regex: searchQuery, $options: 'i' };
			}
			if (category) {
				filters.category = category;
			}
			if (rating) {
				filters.rating = { $gte: rating };
			}
			if (price) {
				const [min, max] = price.split('-').map(parseFloat);
				filters.price = { $gte: min, $lte: max };
			}

			const sortOrder =
				order === 'lowest'
					? { price: 1 }
					: order === 'highest'
					? { price: -1 }
					: order === 'toprated'
					? { rating: -1 }
					: order === 'newest'
					? { createdAt: -1 }
					: { _id: -1 };

			const products = await Product.find(filters)
				.sort(sortOrder)
				.skip(pageSize * (page - 1))
				.limit(pageSize);

			const countProducts = await Product.countDocuments(filters);

			res.send({
				products,
				countProducts,
				page,
				pages: Math.ceil(countProducts / pageSize),
			});
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	})
);

productRouter.get('/:productId', async (req, res) => {
	const product = await Product.findById(req.params.productId);
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
