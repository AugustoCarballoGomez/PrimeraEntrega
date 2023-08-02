const express = require('express');
const controller = require('./controller');
const products = require ('./products/products.js')
const cart =require ("./cart");

const app = express();
const port = 8080;


app.use(express.json());


app.use('/', controller);
app.use("/",cart);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});




module.exports = app;