import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Store, actions } from '../Store';
import usersApi from '../api/usersApi';
import useRequest from '../hooks/useRequest';
import { getError } from '../utils';
import MessageBox from '../components/MessageBox';

function ProfilePage() {
	const navigate = useNavigate();

	const {
		state: { userInfo },
		dispatch,
	} = useContext(Store);

	const [name, setName] = useState(userInfo?.name ?? '');
	const [email, setEmail] = useState(userInfo?.email ?? '');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const { error, loading, onRequest, onSuccess, onFail } = useRequest();

	const submitHandler = async (e) => {
		try {
			e.preventDefault();
			onRequest();
			const profile = {
				name: name !== userInfo.name ? name : undefined,
				email: email !== userInfo.email ? email : undefined,
				password: password !== '' ? password : undefined,
				newPassword: newPassword !== '' || newPassword === password ? newPassword : undefined,
			};

			const hasUpdate = Object.keys(profile).some((key) => key !== 'password' && profile[key] !== undefined);

			if (hasUpdate) {
				const { data } = await usersApi.profile(profile, userInfo.token);
				dispatch({ type: actions.USER_SIGNIN, payload: data });
				setName(data.name);
				setEmail(data.email);
			} else {
				toast.error('No profile updates!');
			}
			onSuccess();
		} catch (err) {
			onFail(getError(err));
		}
	};

	useEffect(() => {
		if (!userInfo) navigate('/signin?redirect=/profile');
	}, [userInfo, navigate]);

	return (
		<Container className='small-container'>
			<Helmet>
				<title>E Shop - Profile</title>
			</Helmet>
			<h1 className='my-3'>Profile</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Full Name</Form.Label>
					<Form.Control value={name} onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control value={email} type='email' autoComplete='username' onChange={(e) => setEmail(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' autoComplete='new-password' required onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='newPassword'>
					<Form.Label>New Password</Form.Label>
					<Form.Control type='password' autoComplete='new-password' onChange={(e) => setNewPassword(e.target.value)} />
				</Form.Group>
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div className='mb-3'>
					<Button type='submit' disabled={loading}>
						Update
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default ProfilePage;
