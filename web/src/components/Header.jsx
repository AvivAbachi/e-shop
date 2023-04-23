import { useContext } from 'react';
import { Badge, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { actions, Store } from '../Store';
import SearchBox from './SearchBox';

export function Header() {
	const {
		state: {
			cart: { cartItems },
			userInfo,
		},
		dispatch,
	} = useContext(Store);
	const navigate = useNavigate();

	const signgoutHandelr = () => {
		dispatch({ type: actions.USER_SIGNOUT });
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark'>
				<Container>
					{location.pathname !== '/' && (
						<Link onClick={() => navigate(-1)} className='me-4 fw-bold link-light text-decoration-none'>
							<i className='fa fa-arrow-left me-2' />
							Back
						</Link>
					)}
					<LinkContainer to='/' className='fw-bold'>
						<Navbar.Brand>E Shop</Navbar.Brand>
					</LinkContainer>
					<SearchBox />
					<nav className='ms-auto d-flex justify-content-end text-white'>
						<Link to='/cart' className='nav-link me-3'>
							<i className='fas fa-shopping-cart' />
							{cartItems.length > 0 && (
								<Badge pill bg='danger'>
									{cartItems.reduce((a, c) => a + c.quantity, 0)}
								</Badge>
							)}
						</Link>
						{userInfo ? (
							<NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>User Profile</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/order/history'>
									<NavDropdown.Item>Order History</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={signgoutHandelr}>Sign Out</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Link to='/signin' className='nav-link'>
								Sign in
							</Link>
						)}
					</nav>
				</Container>
			</Navbar>
		</header>
	);
}
