import axios from '.';

async function signin(email, password) {
	return await axios.post('/api/v1/users/signin', { email, password });
}

async function signup(name, email, password) {
	return await axios.post('/api/v1/users/signup', { name, email, password });
}

async function forget(name, email) {
	return await axios.post('/api/v1/users/forget', { name, email });
}

async function profile({ name, email, password, newPassword }, token) {
	return await axios.post('/api/v1/users/profile', { name, email, password, newPassword }, { headers: { authorization: token } });
}

async function access(token) {
	return await axios.post('/api/v1/users/access ', undefined, { headers: { authorization: token } });
}

export default {
	signin,
	signup,
	forget,
	profile,
	access,
};
