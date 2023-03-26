function ProductItem({ id, name, image, description }) {
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
export default ProductItem;
