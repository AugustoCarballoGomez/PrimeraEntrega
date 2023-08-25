const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
   
  
});

module.exports = mongoose.model('Cart', cartSchema);