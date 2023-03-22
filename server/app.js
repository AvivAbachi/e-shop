import express from 'express';
import cors from 'cors';
import data from './data.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/api/v1/products', (req, res) => res.send(data.products));

app.get('/api/v1/products/:id', (req, res) => {
	const product = data.products.find((p) => p.id === req.params.id);
	if (product) return res.send(product);
	return res.status(404).send('Product not found');
});

app.listen(port, () => console.log(`E-Shop server listening on port ${port}!`));
