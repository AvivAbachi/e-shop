import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import usersApi from '../api/usersApi';
import MessageBox from '../components/MessageBox';
import useRequest from '../hooks/useRequest';
import { actions, Store } from '../Store';
import { getError } from '../utils';

function ForgetPasswordPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirect = useMemo(() => new URLSearchParams(search).get('redirect') ?? '/', [search]);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const { data: user, error, loading, onRequest, onSuccess, onFail } = useRequest();
	const {
		state: { userInfo },
		dispatch,
	} = useContext(Store);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			onRequest();
			const { data } = await usersApi.forget(name, email);
			onSuccess(data);
			dispatch({ type: actions.USER_SIGNIN, payload: data });
		} catch (err) {
			onFail(getError(err));
		}
	};

	useEffect(() => {
		if (userInfo && !user) navigate(redirect);
	}, [navigate, redirect, userInfo, user]);

	return (
		<Container className='small-container'>
			<Helmet>
				<title>E Shop - Forget Password</title>
			</Helmet>
			<h1 className='my-3'>Forget Password</h1>
			{user ? (
				<Card className='mt-5'>
					<Card.Body>
						<div className='mb-3 text-center'>
							<div className='fs-5'>Your new Password</div>
							<div className='fs-1 fw-bold'>{user.password}</div>
						</div>
						<LinkContainer to={redirect}>
							<Button className='w-full d-block'>Continue</Button>
						</LinkContainer>
					</Card.Body>
				</Card>
			) : (
				<Form onSubmit={submitHandler}>
					<Form.Group className='mb-3' controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control required onChange={(e) => setName(e.target.value)} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
					</Form.Group>
					{error && <MessageBox variant='danger'>{error}</MessageBox>}
					<div className='mb-3'>
						<Button type='submit' disabled={loading}>
							Reset Password
						</Button>
					</div>
					<div className='mb-3'>
						New customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
					</div>
					<div className='mb-3'>
						Remember your password? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
					</div>
				</Form>
			)}
		</Container>
	);
}

export default ForgetPasswordPage;
