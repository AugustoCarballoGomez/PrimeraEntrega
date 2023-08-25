const express = require('express');
const controller = require('./controller');
const products = require('./products/products.js');
const cartsRouter = require('./dao/fileSystem/cart');
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const connectMongo = require("./dao/db");

const app = express();
const port = 8080;

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});

const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.render('chat', { messages: [] });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat-message', (data) => {
    io.emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

connectMongo();

module.exports = app;