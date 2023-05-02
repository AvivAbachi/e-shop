import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
	return (
		<div className='d-flex flex-column side-allpage'>
			<Header />
			<main className='mt-5 p-5'>
				<Container>
					<Outlet />
				</Container>
			</main>
			<ToastContainer position='bottom-center' limit={1} />
			<Footer />
		</div>
	);
}

export default App;
