const express = require('express');
const controller = require('./controller');
const products = require ('./products/products.js')
const cartsRouter = require('./dao/fileSystem/cart');
const handlebars = require("express-handlebars")
const { Server } =require ("socket.io")
const socket = require("socket.io")
const connectMongo= require("./dao/db")



const app = express();
const port = 8080;

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.engine("handlebars", handlebars.engine())
app.set("views" , __dirname +"/views")
app.set("view engine" ,"handlebars")




const httpServer =app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});

const io = new Server(httpServer)


io.on("connection" , socket => {
  socket.on("message",payload => {
    console.log(payload,socket.id)
  })})



io.emit("todos ", "este mensaje es para todos los conectados ")


//app.use('/', controller);
app.use('/', cartsRouter);

 

connectMongo()


module.exports = app;