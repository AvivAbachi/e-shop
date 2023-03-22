import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div>
			<header>
				<a href='/'>E Shop</a>
			</header>
			<Outlet />
		</div>
	);
}

export default App;
