const fs = require("fs");
const path = require('path')
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const productArr = data.products;

const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('dev'))
server.use(express.static('public'));
server.use(express.json());

//Products
//API ROOT / baseURL : abcd.com/:products or example google/api/v2/:products

//C R U D

//Create POST /products req.body
server.post('/products',(req,res)=>{
  const product = req.body;
  productArr.push(product);
  res.status(201).send(product);
})

//Read GET /products
server.get('/products',(req,res)=>{
  res.status(200).json(productArr);
})

//Read GET /products/:id
server.get('/products/:id',(req,res)=>{
  const id = +req.params.id
  const product = productArr.find(p=>p.id===id);
  res.status(200).json(product)
})

//Update PUT /products/:id  //PUT is used for comptetely replace the data
server.put('/products/:id',(req,res)=>{
  const id = +req.params.id
  const productIdx = productArr.findIndex(p=>p.id===id);
  productArr.splice(productIdx , 1 , {...req.body, id:id})
  res.status(200).json({"status": "Product is Replace with New Payload"})
})

//Update PATCH /products/:id  //PUT is used for specific change in the data
server.patch('/products/:id',(req,res)=>{
  const id = +req.params.id
  const productIdx = productArr.findIndex(p=>p.id===id);
  const product = productArr[productIdx];
  productArr.splice(productIdx , 1 , {...product,...req.body})
  res.status(200).json()
})

//Delete DELETE /products/:id 
server.delete('/products/:id',(req,res)=>{
  const id = +req.params.id
  const productIdx = productArr.findIndex(p=>p.id===id);
  const DeletedProduct = productArr.splice(productIdx , 1)
  res.status(200).json(DeletedProduct)
})


server.listen(8080, ()=>{
  console.log('server started');
});
