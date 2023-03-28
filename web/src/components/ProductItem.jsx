import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function ProductItem({ product: { token, name, image, price, rating, totalReviews } }) {
	return (
		<Card className='product-card'>
			<Link to={`/products/${token}`}>
				<Card.Img variant='top' alt={name} src={image} />
			</Link>
			<Card.Body>
				<Link to={`/products/${token}`}>
					<Card.Title>{name}</Card.Title>
				</Link>
				<Rating rating={rating} totalReviews={totalReviews} />
				<Card.Text>{price}$</Card.Text>
				<Button>Add To Cart!</Button>
			</Card.Body>
		</Card>
	);
}
export default ProductItem;
