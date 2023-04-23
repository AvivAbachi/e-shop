import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import usersApi from '../api/usersApi';
import { actions, Store } from '../Store';
import { getError } from '../utils';

function SignupPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirect = useMemo(() => new URLSearchParams(search).get('redirect') ?? '/', [search]);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const {
		state: { userInfo },
		dispatch,
	} = useContext(Store);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				toast.error('Password not Match!');
				return;
			}
			const { data } = await usersApi.signup(name, email, password);
			dispatch({ type: actions.USER_SIGNIN, payload: data });
			navigate(redirect);
		} catch (err) {
			toast.error(getError(err));
		}
	};

	useEffect(() => {
		if (userInfo) navigate(redirect);
	}, [navigate, redirect, userInfo]);

	return (
		<Container className='small-container'>
			<Helmet>
				<title>E Shop - Sign Up</title>
			</Helmet>
			<h1 className='my-3'>Sign Up</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Full Name</Form.Label>
					<Form.Control required onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type='password' required onChange={(e) => setConfirmPassword(e.target.value)} />
				</Form.Group>
				<div className='mb-3'>
					<Button type='submit'>Sign Up</Button>
				</div>
				<div className='mb-3'>
					Already have an account customer? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
				</div>
			</Form>
		</Container>
	);
}

export default SignupPage;
