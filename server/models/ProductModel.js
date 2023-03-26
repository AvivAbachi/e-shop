import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		catagory: { type: String, required: true },
		price: { type: Number, required: true },
		token: { type: String, required: true, unique: true },
		brand: { type: String },
		description: { type: String },
		stock: { type: Number, required: true },
		rating: { type: Number, required: true },
		reviews: { type: Number, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
