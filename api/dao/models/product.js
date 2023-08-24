const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: "Producto 2",
      description: "Descripción 2",
      price: 110,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1232",
      status: true,
      stock: 501
  
});

module.exports = mongoose.model('Cart', cartSchema);