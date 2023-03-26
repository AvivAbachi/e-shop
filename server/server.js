const express = require('express');
const data = require('./data');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/v1/products', (req, res) => res.send(data.products));
app.get('/api/v1/products/:id', (req, res) => {
	const product = data.products.find((p) => p.id === req.params.id);
	if (product) return res.send(product);
	return res.status(404).send('Product not found');
});

app.listen(port, () => console.log(`E-Shop server listening on port ${port}!`));
