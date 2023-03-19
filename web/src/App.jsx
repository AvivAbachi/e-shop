import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { data } from './data';

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

export function HomePage() {
	return (
		<main>
			<h1>Products</h1>
			<div className='list'>
				{data.products.map((p) => (
					<Product key={p.id} {...p} />
				))}
			</div>
		</main>
	);
}

export async function loader({ params }) {
	const product = data.products.find((p) => p.id === params.id);
	return { product };
}

export function ProductPage() {
	const {
		product: {
			name,
			catagory,
			price,
			id,
			brand,
			description,
			stock,
			rating,
			reviews,
			image,
		},
	} = useLoaderData();

	return (
		<div>
			<h1>{name} </h1>
		</div>
	);
}

function Product({ id, name, image, description }) {
	return (
		<div className='product'>
			<a href={`/products/${id}`}>
				<img alt={name} src={image} />
			</a>
			<h3>{name}</h3>
			<p>{description}</p>
		</div>
	);
}
