const { Router } = require('express');

const router = express.Router();

function generateCartId() {
    return Date.now().toString();
  }
  
  
  router.post("/", (req, res) => {
    const { products } = req.body;
  
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "La propiedad 'products' debe ser un array." });
    }
  
    const newCart = {
      id: generateCartId(), 
    };
  
    return res.status(201).json(newCart);
  });
  


  router.get("/:cid", (req, res) => {
    const { cid } = req.params;
  
    const cartProducts = [
      {
        id: 1,
        name: "Producto 1",
        price: 10,
      },
      {
        id: 2,
        name: "Producto 2",
        price: 20,
      },
    ];
  
    res.json(cartProducts);
  });
  
  
  router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
  

    const addedProduct = {
      id: pid,
    };
  
    res.json({ message: "Producto agregado al carrito exitosamente.", addedProduct });
  });
  module.exports = router;