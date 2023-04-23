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
		const pageSize = req.query.pageSize || PAGE_SIZE;
		const page = req.query.page || 1;
		const category = req.query.category || '';
		const price = req.query.price || '';
		const rating = req.query.rating || '';
		const order = req.query.order || '';
		const searchQuery = req.query.query || '';
		console.log(searchQuery);
		const queryFilter =
			searchQuery && searchQuery !== 'all'
				? {
						title: {
							$regex: searchQuery,
							$options: 'i',
						},
				  }
				: {};

		const categoryFilter = category && category !== 'all' ? { category } : {};

		const ratingFilter =
			rating && rating !== 'all'
				? {
						rating: {
							$gte: Number(rating),
						},
				  }
				: {};
		const priceFilter =
			price && price !== 'all'
				? {
						price: {
							$gte: Number(price.split('-')[0]),
							$lte: Number(price.split('-')[1]),
						},
				  }
				: {};

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

		const products = await Product.find({
			...queryFilter,
			...categoryFilter,
			...priceFilter,
			...ratingFilter,
		})
			.sort(sortOrder)
			.skip(pageSize * (page - 1))
			.limit(pageSize);

		const countProducts = await Product.countDocuments({
			...queryFilter,
			...categoryFilter,
			...priceFilter,
			...ratingFilter,
		});

		res.send({
			products,
			countProducts,
			page,
			pages: Math.ceil(countProducts / pageSize),
		});
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
