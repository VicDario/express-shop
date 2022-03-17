const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');
const categoriesRouter = require('./categoriesRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

function routerAPI (app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/product', productsRouter);
	router.use('/category', categoriesRouter);
	router.use('/user', usersRouter);
	router.use('/customer', customersRouter);
	router.use('/order', ordersRouter);
	router.use('/auth', authRouter);
	router.use('/profile', profileRouter);
}

module.exports = routerAPI;
