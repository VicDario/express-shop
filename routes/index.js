const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');

function routerAPI (app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/products', productsRouter);
	router.use('/user', usersRouter);
}

module.exports = routerAPI;
