import { useEffect, useState } from 'react';
import { Button, Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '../api/productsApi';

function SearchBox() {
	const [query, setQuery] = useState('');
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		const trim = query.trim();
		setQuery(trim);
		setProducts([]);
		navigate(`/search${trim ? `/?query=${trim}` : ''}`);
	};

	useEffect(() => {
		const getData = async () => {
			const trim = query.trim();
			if (trim.length < 3) {
				setProducts([]);
			} else {
				try {
					const { data } = await productsApi.searchProducts(`/?query=${trim}`);
					setProducts(data.products);
				} catch (err) {
					toast.error(getError(err));
				}
			}
		};
		getData();
	}, [query]);

	return (
		<Form onSubmit={submitHandler} className='d-flex mx-auto w-50 position-relative'>
			<InputGroup>
				<FormControl
					aria-describedby='button-search'
					name='query'
					id='query'
					type='search'
					placeholder='Search for products'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button variant='outline-primary' type='submit' id='button-search'>
					<i className='fas fa-search' />
				</Button>
			</InputGroup>
			<Dropdown.Menu show={products.length} className='w-100 overflow-hidden'>
				{products.map((p) => (
					<Dropdown.Item key={p._id} as='span' onClick={() => setQuery('')}>
						<Link to={`/products/${p.token}`} className='text-decoration-none text-dark'>
							{p.title}
						</Link>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Form>
	);
}

export default SearchBox;
