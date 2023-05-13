import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '../api/productsApi';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';
import Rating from '../components/Rating';
import useRequest from '../hooks/useRequest';
import { getError, searchFilter } from '../utils';

function SearchPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const { data: results, error, loading, onRequest, onSuccess, onFail } = useRequest();

	const [categories, setCategories] = useState([]);

	const searchParams = new URLSearchParams(search);
	const category = searchParams.get('category');
	const query = searchParams.get('query');
	const price = searchParams.get('price');
	const rating = searchParams.has('rating') ? Number(searchParams.get('rating')) : null;
	const order = searchParams.get('order') || 'newest';
	const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1;

	const getFilterUrl = useCallback(
		(filter = {}, skipPathname = false) => {
			const params = searchFilter(filter, search);
			return (skipPathname ? '?' : '/search?') + params;
		},
		[search]
	);

	useEffect(() => {
		const getCategories = async () => {
			try {
				const { data } = await productsApi.getCategories();
				setCategories(data);
			} catch (err) {
				toast.error(getError(err));
			}
		};
		getCategories();
	}, []);

	useEffect(() => {
		const getData = async () => {
			onRequest();
			try {
				const { data } = await productsApi.searchProducts(search);
				onSuccess(data);
			} catch (err) {
				onFail(getError(err));
			}
		};
		getData();
	}, [search, category, query, price, rating, order, page]);

	return (
		<div>
			<Helmet>
				<title>Serach Products</title>
			</Helmet>
			<Row>
				<Col md={3} className='filter-list'>
					<h3>Category</h3>
					<ul>
						<li>
							<Link className={category === null ? 'fw-bold' : ''} to={getFilterUrl({ category: null })}>
								Any
							</Link>
						</li>
						{categories.map((c) => (
							<li key={c}>
								<Link className={category === c ? 'fw-bold' : ''} to={getFilterUrl({ category: c })}>
									{c}
								</Link>
							</li>
						))}
					</ul>
					<h3>Price</h3>
					<ul>
						<li>
							<Link className={price === null ? 'fw-bold' : ''} to={getFilterUrl({ price: null })}>
								Any
							</Link>
						</li>
						{prices.map((p) => (
							<li key={p.value}>
								<Link to={getFilterUrl({ price: p.value })} className={price === p.value ? 'fw-bold' : ''}>
									{p.name}
								</Link>
							</li>
						))}
					</ul>
					<h3>Reviews</h3>
					<ul>
						<li>
							<Link to={getFilterUrl({ rating: null })} className={rating === null ? 'fw-bold' : ''}>
								Any
							</Link>
						</li>
						{ratings.map((r) => (
							<li className={rating == r.rating ? 'fw-bold' : undefined} key={r.name}>
								<Link to={getFilterUrl({ rating: r.rating })}>
									<Rating rating={r.rating} caption={r.name} />
								</Link>
							</li>
						))}
					</ul>
				</Col>
				<Col md={9}>
					{loading ? (
						<Loading />
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							<Row className='justify-content-between mb-3'>
								<Col md={8}>
									<span className='text-nowrapt'>{(results?.countProducts > 0 ? results?.countProducts : 'No') + ' Results'}</span>
									{query && (
										<Link to={getFilterUrl({ query: null })}>
											<Badge pill bg='warning' className='text-dark ms-2 my-1'>
												{query} <i className='fas fa-times-circle' />
											</Badge>
										</Link>
									)}
									{category && (
										<Link to={getFilterUrl({ category: null })}>
											<Badge pill bg='warning' className='text-dark ms-2 my-1'>
												{category} <i className='fas fa-times-circle' />
											</Badge>
										</Link>
									)}
									{price && (
										<Link to={getFilterUrl({ price: null })}>
											<Badge pill bg='warning' className='text-dark ms-2 my-1'>
												{price} <i className='fas fa-times-circle' />
											</Badge>
										</Link>
									)}
									{rating && (
										<Link to={getFilterUrl({ rating: null })}>
											<Badge pill bg='warning' className='text-dark ms-2 my-1'>
												{ratings.find((r) => r.rating === rating).name} <i className='fas fa-times-circle' />
											</Badge>
										</Link>
									)}
								</Col>
								<Col className='mt-3 mt-md-0 text-md-end'>
									Sort by{' '}
									<select
										value={order}
										onChange={(e) => {
											navigate(getFilterUrl({ order: e.target.value }));
										}}
									>
										<option value=''>Newest Arrivals</option>
										<option value='lowest'>Price: Low to High</option>
										<option value='highest'>Price: High to Low</option>
										<option value='toprated'>Customer Reviews</option>
									</select>
								</Col>
							</Row>
							{results?.products?.length === 0 && <MessageBox>No Product Found</MessageBox>}
							<Row>
								{results?.products?.map((product) => (
									<Col sm={6} lg={4} className='mb-3' key={product._id}>
										<ProductCard product={product} />
									</Col>
								))}
							</Row>
							<div>
								{[...Array(results?.pages).keys()].map((x) => (
									<LinkContainer
										key={x + 1}
										className='mx-1'
										to={{
											pathname: '/search',
											search: getFilterUrl({ page: x + 1 }, true),
										}}
									>
										<Button className={Number(page) === x + 1 ? 'active-page-button' : ''} variant='light'>
											{x + 1}
										</Button>
									</LinkContainer>
								))}
							</div>
						</>
					)}
				</Col>
			</Row>
		</div>
	);
}

export default SearchPage;

const prices = [
	{ name: '$1 to $50', value: '1-50' },
	{ name: '$51 to $200', value: '51-200' },
	{ name: '$201 to $1000', value: '201-1000' },
];

export const ratings = [
	{ name: '4 Stars & Up', rating: 4 },
	{ name: '3 Stars & Up', rating: 3 },
	{ name: '2 Stars & Up', rating: 2 },
	{ name: '1 Stars & Up', rating: 1 },
];
