const { Router } = require('express');
const router = Router();
const products = require('./products/products')

router.get('/products', (req, res) => {
  const { limit } = req.query;
  res.json({ message: products });
});

router.get('/:id', (req, res) => {
  res.json({ message: `products ${req.params.id}` });
});

router.post('/products', (req, res) => {
  const {title , description, price, thumbnail, code, stock } = req.body
const productInfo = { 
title , 
description,
price,
thumbnail,
code,
stock

}

products.push(productInfo)
  console.log(productInfo);

  res.json({message: 'Producto agregado'});
});

router.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { stock } = req.body;

  const product = products.find(product => product.id === productId);

  if (product) {
    product.stock = stock;
    res.json({ message: `Producto con ID ${productId} actualizado con nuevo stock: ${stock}` });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  res.json({ message: `delete product ${req.params.id}` });
});

module.exports = router;