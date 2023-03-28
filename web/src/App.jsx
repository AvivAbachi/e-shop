import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className='d-flex flex-column side-allpage'>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>E Shop</Navbar.Brand>
					</LinkContainer>
				</Container>
			</Navbar>
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<footer>
				<div className='text-center'>all right reserved</div>
			</footer>
		</div>
	);
}

export default App;
