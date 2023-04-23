import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';
import { actions, Store } from '../Store';

function PaymantPage() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const {
		userInfo,
		cart: { shippingAddress, paymentMethod },
	} = state;

	const [method, setMethod] = useState(paymentMethod);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch({ type: actions.SAVE_PAYMENT_METHOD, payload: method });
		navigate('/placeorder');
	};

	useEffect(() => {
		if (!userInfo) navigate('/signin?redirect=/payment');
		if (!shippingAddress.address) navigate('/shipping');
	}, [userInfo, shippingAddress.address, navigate]);

	return (
		<div>
			<Helmet>
				<title>E Shop - Payment Method</title>
			</Helmet>
			<CheckoutSteps step1 step2 step3 />
			<div className='container small-container'>
				<h1 className='my-3'>Payment Method</h1>
				<Form onSubmit={submitHandler}>
					<div className='mb-3'>
						<Form.Check
							type='radio'
							id='PayPal'
							label='PayPal'
							value='paypal'
							checked={method === 'paypal'}
							onChange={(e) => setMethod(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<Form.Check
							type='radio'
							id='Stripe'
							label='Stripe'
							value='stripe'
							checked={method === 'stripe'}
							onChange={(e) => setMethod(e.target.value)}
						/>
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

export default PaymantPage;
