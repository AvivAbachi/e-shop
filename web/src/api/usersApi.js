import axios from '.';

async function signin(email, password) {
	return await axios.post('/api/v1/users/signin', { email, password });
}

async function signup(name, email, password) {
	return await axios.post('/api/v1/users/signup', { name, email, password });
}

export default {
	signin,
	signup,
};
