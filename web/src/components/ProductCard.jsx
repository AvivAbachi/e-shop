import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { actions, Store } from '../Store';
import { tryAddToCart } from '../utils';
import Rating from './Rating';

function ProductCard({ product }) {
	const { state, dispatch } = useContext(Store);

	const addToCartHandler = async () => {
		try {
			const quantity = await tryAddToCart(state.cart, product);
			toast.success('Product add to cart', { hideProgressBar: true, progress: 0.5 });
			dispatch({
				type: actions.ADD_TO_CART,
				payload: { ...product, quantity },
			});
		} catch (err) {
			toast.error(err);
		}
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
