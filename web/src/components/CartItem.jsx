import { Button, Col, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartItem({ title, token, image, quantity, price, stock, onIncrease, onDecrease, onRemove }) {
	return (
		<ListGroupItem>
			<Row className='align-items-center'>
				<Col md={4}>
					<Link to={`/products/${token}`}>
						<img className='img-fluid rounded img-thumbnail' src={image} alt={title} />
					</Link>
				</Col>
				<Col md={3}>
					{onDecrease && (
						<Button variant='light' disabled={quantity === 1} onClick={onDecrease}>
							<i className='fas fa-minus-circle' />
						</Button>
					)}
					<span> {quantity} </span>
					{onIncrease && (
						<Button onClick={onIncrease} variant='light' disabled={quantity === stock}>
							<i className='fas fa-plus-circle' />
						</Button>
					)}
				</Col>
				<Col md={3}>{price} $</Col>
				{onRemove && (
					<Col md={2}>
						<Button variant='light' onClick={onRemove}>
							<i className='fas fa-trash' />
						</Button>
					</Col>
				)}
			</Row>
			<Link to={`/products/${token}`}>{title}</Link>
		</ListGroupItem>
	);
}

export default CartItem;
