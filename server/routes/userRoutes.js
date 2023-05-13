import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import User from '../models/UserModel.js';
import { generatePassword, generateToken, isAuth } from '../utils/index.js';

const userRouter = express.Router();

userRouter.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				return res.send({
					_id: user._id,
					name: user.name,
					email: user.email,
					token: generateToken(user),
				});
			}
		}
		res.status(401).send({ message: 'Invalid Password/User' });
	})
);

userRouter.post(
	'/signup',
	expressAsyncHandler(async (req, res) => {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password),
		});

		const user = await newUser.save();

		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user),
		});
	})
);

userRouter.post(
	'/profile',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				if (req.body.name) user.name = req.body.name;
				if (req.body.email) user.email = req.body.email;
				if (req.body.newPassword) user.password = bcrypt.hashSync(req.body.newPassword);

				const updateUser = await user.save();

				return res.send({
					_id: updateUser._id,
					name: updateUser.name,
					email: updateUser.email,
					token: generateToken(updateUser),
				});
			}
		}
		res.status(401).send({ message: 'Invalid User' });
	})
);

userRouter.post(
	'/forget',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user.name.toLowerCase() === req.body.name?.toLowerCase()) {
			const newPassword = generatePassword();
			const reset = await User.findOneAndUpdate({ email: req.body.email }, { password: bcrypt.hashSync(newPassword) });
			return res.send({
				_id: reset._id,
				name: reset.name,
				email: reset.email,
				password: newPassword,
				token: generateToken(reset),
			});
		}
		res.status(401).send({ message: 'Invalid User' });
	})
);

userRouter.post(
	'/access',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);
		if (user) {
			return res.send({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user),
			});
		}
		res.status(401).send({ message: 'Invalid User' });
	})
);

export default userRouter;
