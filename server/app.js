import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import data from './data.js';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use('/api/v1/seed', seedRouter);

app.get('/api/v1/products', (req, res) => res.send(data.products));

app.get('/api/v1/products/:id', (req, res) => {
	const product = data.products.find((p) => p.id === req.params.id);
	if (product) return res.send(product);
	return res.status(404).send('Product not found');
});

mongoose
	.connect(process.env.DB)
	.then(() => {
		console.log('Connected to Database!');
		app.listen(port, () => {
			console.log(`E-Shop server listening on port ${port}!`);
		});
	})
	.catch((err) => {
		console.error(`Fail to Connect Database!\n ${err.message}`);
	});
