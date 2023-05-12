import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';

import Order from '../models/OrderModel.js';
import { isAuth } from '../utils/index.js';

const orderRouter = express.Router();

orderRouter.get(
	'/all',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
		res.send(orders);
	})
);

orderRouter.get(
	'/:id',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		if (isValidObjectId(req.params.id)) {
			const order = await Order.findById(req.params.id);
			if (order?.user._id.toString() === req.user._id) {
				res.send(order);
				return;
			}
		}
		res.status(404).send({ message: 'Order not found' });
	})
);

orderRouter.post(
	'/',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const newOrder = new Order({
			orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
			shippingAddress: req.body.shippingAddress,
			paymentMethod: req.body.paymentMethod,
			itemsPrice: req.body.itemsPrice,
			shippingPrice: req.body.shippingPrice,
			taxPrice: req.body.taxPrice,
			totalPrice: req.body.totalPrice,
			user: req.user._id,
		});

		const order = await newOrder.save();
		res.status(201).send({ message: 'New Order Created', order });
	})
);

export default orderRouter;
