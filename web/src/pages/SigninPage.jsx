import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import usersApi from '../api/usersApi';
import { actions, Store } from '../Store';
import { getError } from '../utils';

function SigninPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirect = useMemo(() => new URLSearchParams(search).get('redirect') ?? '/', [search]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		state: { userInfo },
		dispatch,
	} = useContext(Store);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await usersApi.signin(email, password);
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
				<title>E Shop - Sign In</title>
			</Helmet>
			<h1 className='my-3'>Sign In</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>
				<div className='mb-3'>
					<Button type='submit'>Sign In</Button>
				</div>
				<div className='mb-3'>
					New customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
				</div>
				<div className='mb-3'>
					Forget Password? <Link to='/forget-password'>Reset Password</Link>
				</div>
			</Form>
		</Container>
	);
}

export default SigninPage;
