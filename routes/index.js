const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');
const categoriesRouter = require('./categoriesRouter');
const ordersRouter = require('./ordersRouter');

function routerAPI (app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/product', productsRouter);
	router.use('/category', categoriesRouter);
	router.use('/user', usersRouter);
	router.use('/customer', customersRouter);
	router.use('/order', ordersRouter);
}

module.exports = routerAPI;
