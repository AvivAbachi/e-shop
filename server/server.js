import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/users', userRouter);

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
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
		console.error(`Fail to Connect Database!\n${err.message}`);
	});
