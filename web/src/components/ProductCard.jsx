import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import productsApi from '../api/productsApi';
import { Store, storeActions } from '../Store';
import Rating from './Rating';

function ProductCard({ product }) {
	const { state, dispatch } = useContext(Store);

	const addToCartHandler = async () => {
		const existedItem = state.cart.cartItems.find((x) => x._id === product._id);
		const quantity = existedItem ? existedItem.quantity + 1 : 1;
		const { data } = await productsApi.getProductById(product._id);

		if (data.stock < quantity) {
			window.alert('Sorry. Product is out of stock');
			return;
		}

		dispatch({
			type: storeActions.ADD_TO_CART,
			payload: { ...product, quantity },
		});
	};

	return (
		<Card className='product-card'>
			<Link to={`/products/${product.token}`}>
				<Card.Img variant='top' alt={product.name} src={product.image} />
			</Link>
			<Card.Body>
				<Link to={`/products/${product.token}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
				<Rating rating={product.rating} totalReviews={product.totalReviews} />
				<Card.Text>{product.price}$</Card.Text>
				{product.stock === 0 ? (
					<Button variant='light' disabled>
						Out of Stock
					</Button>
				) : (
					<Button onClick={addToCartHandler}>Add To Cart!</Button>
				)}
			</Card.Body>
		</Card>
	);
}
export default ProductCard;
