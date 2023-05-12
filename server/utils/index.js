import jwt from 'jsonwebtoken';

export function generateToken(user) {
	return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

export function generatePassword() {
	return Math.random().toString(36).slice(-8);
}

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).send({ message: 'Invalid Admin Token' });
	}
};

export const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization;
	if (authorization) {
		const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: 'Invalid Token' });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: 'No Token' });
	}
};
