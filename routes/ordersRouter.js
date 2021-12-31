const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orderSchema');

const OrderService = require('../services/orderService');

const router = express.Router();

const service = new OrderService();

router.get(
	'/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	'/',
	validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newOrder = await service.create(body);
			res.status(201).json(newOrder);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/add-item',
	validatorHandler(addItemSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newItem = await service.addItem(body);
			res.status(201).json(newItem);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
