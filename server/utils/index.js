import jwt from 'jsonwebtoken';

export function generateToken(user) {
	return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

export function generatePassword() {
	return Math.random().toString(36).slice(-8);
}

export const isAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: 'Invalid Token' });
			}
			req.user = decode;
			next();
		});
	} else {
		res.status(401).send({ message: 'No Token' });
	}
};
