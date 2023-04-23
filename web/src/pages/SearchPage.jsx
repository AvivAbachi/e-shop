import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
import { getError } from '../utils';

function SearchPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const searchParam = new URLSearchParams(search);

	const [categories, setCategories] = useState([]);

	const category = searchParam.get('category') || 'all';
	const query = searchParam.get('query') || 'all';
	const price = searchParam.get('price') || 'all';
	const rating = searchParam.get('rating') || 'all';
	const order = searchParam.get('order') || 'newest';
	const page = searchParam.get('page') || 1;

	const { loading, data, error, onFail, onRequest, onSuccess } = useRequest();

	const getFilterUrl = (filter, skipPathname) => {
		const filterPage = filter.page || page;
		const filterCategory = filter.category || category;
		const filterQuery = filter.query || query;
		const filterRating = filter.rating || rating;
		const filterPrice = filter.price || price;
		const sortOrder = filter.order || order;
		const link = `${
			skipPathname ? '' : '/search?'
		}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
		return link;
	};

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
				const { data } = await productsApi.searchProduct(page, query, category, price, rating, order);
				onSuccess(data);
			} catch (err) {
				onFail(getError(err));
			}
		};
		getData();
	}, [page, query, category, price, rating, order]);

	return (
		<div>
			<Helmet>
				<title>Serach Products</title>
			</Helmet>
			<Row>
				<Col md={3} className='filter-list'>
					<h3>Category</h3>
					<div>
						<ul>
							<li>
								<Link className={'all' === category ? 'fw-bold' : ''} to={getFilterUrl({ category: 'all' })}>
									Any
								</Link>
							</li>
							{categories.map((c) => (
								<li key={c}>
									<Link className={c === category ? 'fw-bold' : ''} to={getFilterUrl({ category: c })}>
										{c}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Price</h3>
						<ul>
							<li>
								<Link className={'all' === price ? 'fw-bold' : ''} to={getFilterUrl({ price: 'all' })}>
									Any
								</Link>
							</li>
							{prices.map((p) => (
								<li key={p.value}>
									<Link to={getFilterUrl({ price: p.value })} className={p.value === price ? 'fw-bold' : ''}>
										{p.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Reviews</h3>
						<ul>
							{ratings.map((r) => (
								<li key={r.name}>
									<Link to={getFilterUrl({ rating: r.rating })} className={`${r.rating}` === `${rating}` ? 'fw-bold' : ''}>
										<Rating rating={r.rating} caption={r.name} />
									</Link>
								</li>
							))}
						</ul>
					</div>
				</Col>
				<Col md={9}>
					{loading ? (
						<Loading />
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							<Row className='justify-content-between mb-3'>
								<Col md={6}>
									<div>
										{data?.countProducts === 0 ? 'No' : data?.countProducts} Results
										{query !== 'all' && ' : ' + query}
										{category !== 'all' && ' : ' + category}
										{price !== 'all' && ' : Price ' + price}
										{rating !== 'all' && ' : Rating ' + rating + ' & up'}
										{query !== 'all' || category !== 'all' || rating !== 'all' || price !== 'all' ? (
											<Button variant='light' onClick={() => navigate('/search')}>
												<i className='fas fa-times-circle' />
											</Button>
										) : null}
									</div>
								</Col>
								<Col className='text-end'>
									Sort by{' '}
									<select
										value={order}
										onChange={(e) => {
											navigate(getFilterUrl({ order: e.target.value }));
										}}
									>
										<option value='newest'>Newest Arrivals</option>
										<option value='lowest'>Price: Low to High</option>
										<option value='highest'>Price: High to Low</option>
										<option value='toprated'>Customer Reviews</option>
									</select>
								</Col>
							</Row>
							{data?.products?.length === 0 && <MessageBox>No Product Found</MessageBox>}
							<Row>
								{data?.products?.map((product) => (
									<Col sm={6} lg={4} className='mb-3' key={product._id}>
										<ProductCard product={product} />
									</Col>
								))}
							</Row>
							<div>
								{[...Array(data?.pages).keys()].map((x) => (
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
	{ name: '4stars & up', rating: 4 },
	{ name: '3stars & up', rating: 3 },
	{ name: '2stars & up', rating: 2 },
	{ name: '1stars & up', rating: 1 },
];
