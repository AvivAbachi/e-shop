import Jwt from 'jsonwebtoken';

export function generateToken(user) {
	return Jwt.sign(
		{ _id: user._id, name: user.name, email: user.email },
		process.env.JWT_PW,
		{ expiresIn: '15d' }
	);
}
