const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orderSchema');

const passport = require('passport');

const router = express.Router();

const OrderService = require('../services/orderService');
const service = new OrderService();

const { checkRoles } = require('../middlewares/authHandler');

router.get('/:id',
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

router.post('/',
	passport.authenticate('jwt', { session: false }),
	checkRoles('customer', 'admin'),
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
