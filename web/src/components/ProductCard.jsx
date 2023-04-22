import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import productsApi from '../api/productsApi';
import { actions, Store } from '../Store';
import Rating from './Rating';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
	const { state, dispatch } = useContext(Store);

	const addToCartHandler = async () => {
		const existedItem = state.cart.cartItems.find((x) => x._id === product._id);
		const quantity = existedItem ? existedItem.quantity + 1 : 1;
		const { data } = await productsApi.getProductById(product._id);

		if (data.stock < quantity) {
			toast.error('Sorry. Product is out of stock');
			return;
		}

		dispatch({
			type: actions.ADD_TO_CART,
			payload: { ...product, quantity },
		});
	};

	return (
		<Card className='product-card'>
			<Link to={`/products/${product.token}`}>
				<Card.Img variant='top' alt={product.title} src={product.image} />
			</Link>
			<Card.Body>
				<Link to={`/products/${product.token}`}>
					<Card.Title>{product.title}</Card.Title>
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
