import { useContext } from 'react';
import { Badge, Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Store } from './Store';

function App() {
	const { state } = useContext(Store);
	const cartItems = state.cart.cartItems;
	return (
		<div className='d-flex flex-column side-allpage'>
			<header>
				<Navbar bg='dark' variant='dark'>
					<Container>
						<LinkContainer to='/'>
							<Navbar.Brand>E Shop</Navbar.Brand>
						</LinkContainer>
						<nav className='ms-auto w-50 justify-content-end'>
							<Link to='/cart' className='nav-link'>
								<i className='fas fa-shopping-cart text-white'></i>
								{cartItems.length > 0 && (
									<Badge pill bg='danger'>
										{cartItems.reduce((a, c) => a + c.quantity, 0)}
									</Badge>
								)}
							</Link>
						</nav>
					</Container>
				</Navbar>
			</header>
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<footer>
				<div className='text-center'>All Rights Reserved © 2023</div>
			</footer>
		</div>
	);
}

export default App;
