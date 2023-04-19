import { useContext } from 'react';
import { Badge, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { Store, storeActions } from '../Store';

export function Header() {
	const {
		state: {
			cart: { cartItems },
			userInfo,
		},
		dispatch,
	} = useContext(Store);

	const signgoutHandelr = () => {
		dispatch({ type: storeActions.USER_SIGNOUT });
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>E Shop</Navbar.Brand>
					</LinkContainer>
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
								<LinkContainer to='/order/hisory'>
									<NavDropdown.Item>Order History</NavDropdown.Item>
								</LinkContainer>
								{/* <LinkContainer to='/'></LinkContainer> */}
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
