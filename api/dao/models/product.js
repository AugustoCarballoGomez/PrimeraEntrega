const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: String,
      description: String,
      price: Number,
      thumbnail: String,
      code: String,
      status: true,
      stock: Number
  
});

module.exports = mongoose.model('Cart', cartSchema);