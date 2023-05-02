import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div>
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>
			<h1>Sorry We Couldn`t Find Fhat Page</h1>
			Try searching or go <Link to='/'>E Shop home page</Link>
		</div>
	);
}

export default NotFoundPage;
