const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const products = require('../../products/products.js');
const productsFilePath = path.join(__dirname, 'products.json');

async function getProducts(req, res) {
  const { limit = 10, page = 1, sort, query, category, availability } = req.query;

  // Filtros basados en los parámetros de consulta
  let filters = {};
  if (query) {
    filters.type = query;
  }
  if (category) {  // Búsqueda por categoría
    filters.category = category;
  }
  if (availability) {  // Búsqueda por disponibilidad
    filters.availability = availability === 'true';
  }

  let sortOptions = {};
  if (sort === 'asc') {
    sortOptions = { price: 1 };
  } else if (sort === 'desc') {
    sortOptions = { price: -1 };
  }

  try {
    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? parseInt(page) - 1 : null,
      nextPage: page < totalPages ? parseInt(page) + 1 : null,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


router.delete('/:cid/products/:pid')   // eliminar producto del carrito
async function removeProductFromCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { _id: productId } } },
      { new: true }
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


router.put('/:cid')  // actualizar carrito
async function updateCart(req, res) {
  const cartId = req.params.cid;
  const newProducts = req.body.products;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { products: newProducts },
      { new: true }
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


router.put('/:cid/products/:pid')  // actualizar cantidad de producto en el carrito
async function updateProductQuantity(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, 'products._id': productId },
      { $set: { 'products.$.quantity': newQuantity } },
      { new: true }
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

router.get('/carts', (req, res) => {
  try {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});
router.post('/carts', (req, res) => {
  try {
    const productIdsToAdd = req.body.productIds; // Suponemos que el cuerpo de la solicitud tiene un campo "productIds" con los IDs a agregar

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const existingProducts = JSON.parse(productsData);

    const productsToAdd = products.filter(product => productIdsToAdd.includes(product.id));

    const addedProductsInfo = productsToAdd.map(product => ({
      id: product.id,
      stock: product.stock
    }));

    fs.writeFileSync(productsFilePath, JSON.stringify(addedProductsInfo, null, 2));

    res.json({ message: 'Productos agregados al archivo products.json' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar los productos' });
  }
});


router.put('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { stock } = req.body;

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    const product = products.find(product => product.id === productId);

    if (product) {
      product.stock = stock;

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

      res.json({ message: `Producto con ID ${productId} actualizado con nuevo stock: ${stock}` });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.json({ message: 'Producto eliminado', products });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = {
  removeProductFromCart,
  updateCart,
  updateProductQuantity,
};

module.exports = {
  getProducts,
};
module.exports = router;