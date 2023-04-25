import { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		const trim = query.trim();
		setQuery(trim);
		navigate(`/search${trim ? `/?query=${trim}` : ''}`);
	};

	return (
		<Form onSubmit={submitHandler} className='d-flex mx-auto w-50'>
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
		</Form>
	);
}

export default SearchBox;
