import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';
import { Store, storeActions } from '../Store';

export default function ShippingAddressPage() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const {
		userInfo,
		cart: { shippingAddress },
	} = state;

	const [name, setName] = useState(shippingAddress.name || '');
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
	const [country, setCountry] = useState(shippingAddress.country || '');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch({
			type: storeActions.SAVE_SHIPPING_ADDRESS,
			payload: {
				name,
				address,
				city,
				postalCode,
				country,
				location: shippingAddress.location,
			},
		});
		navigate('/payment');
	};

	useEffect(() => {
		if (!userInfo) {
			navigate('/signin?redirect=/shipping');
		}
	}, [userInfo, navigate]);

	// useEffect(() => {
	// 	dispatch({ type: 'SET_FULLBOX_OFF' });
	// }, [dispatch, fullBox]);

	return (
		<div>
			<Helmet>
				<title>Shipping Address</title>
			</Helmet>
			<CheckoutSteps step1 step2 />
			<div className='container small-container'>
				<h1 className='my-3'>Shipping Address</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group className='mb-3' controlId='name'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
					</Form.Group>
					<Form.Group className='mb-3' controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
					</Form.Group>
					<Form.Group className='mb-3' controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
					</Form.Group>
					<Form.Group className='mb-3' controlId='postalCode'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
					</Form.Group>
					<Form.Group className='mb-3' controlId='country'>
						<Form.Label>Country</Form.Label>
						<Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
					</Form.Group>
					<div className='mb-3'>
						<Button id='chooseOnMap' type='button' variant='light' onClick={() => navigate('/map')}>
							Choose Location On Map
						</Button>
						{shippingAddress.location && shippingAddress.location.lat ? (
							<div>
								LAT: {shippingAddress.location.lat}
								LNG:{shippingAddress.location.lng}
							</div>
						) : (
							<div>No location</div>
						)}
					</div>
					<div className='mb-3'>
						<Button variant='primary' type='submit'>
							Continue
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}