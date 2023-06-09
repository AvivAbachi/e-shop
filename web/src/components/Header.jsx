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
		<header className='position-fixed w-100'>
			<Navbar bg='dark' variant='dark'>
				<Container>
					{location.pathname !== '/' && (
						<Link onClick={() => navigate(-1)} className='me-md-4 fw-bold link-light text-decoration-none word-wrap'>
							<i className='fa fa-arrow-left me-2 fa-lg' />
							<span className='d-none d-md-inline'>Back</span>
						</Link>
					)}
					<LinkContainer to='/' className='fw-bold'>
						<Navbar.Brand>
							<img src='/logo.png' height={30} alt='Shop logo' />
						</Navbar.Brand>
					</LinkContainer>
					<SearchBox />
					<nav className='ms-auto d-flex justify-content-end text-white'>
						<Link to='/cart' className='nav-link me-md-4 me-2 position-relative pe-2'>
							<i className='fas fa-shopping-cart fa-lg' />
							{cartItems.length > 0 && (
								<Badge pill bg='danger' className='position-absolute top-0 right-0 translate-middle'>
									{cartItems.reduce((a, c) => a + c.quantity, 0)}
								</Badge>
							)}
						</Link>
						{userInfo ? (
							<NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
								<LinkContainer to='/profile'>
									<NavDropdown.Item className='text-dark'>User Profile</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/order/all'>
									<NavDropdown.Item className='text-dark'>Order History</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item className='text-dark' onClick={signgoutHandelr}>
									Sign Out
								</NavDropdown.Item>
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
