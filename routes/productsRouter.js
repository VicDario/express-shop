const express = require('express');
const ProductService = require('../services/productService');

const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/productSchema');

const router = express.Router();

const service = new ProductService();

router.get('/',
	validatorHandler(queryProductSchema, 'query'),
	async (req, res, next) => {
		try {
			const products = await service.find(req.query);
			res.json(products);
		} catch(error) {
			next(error);
		}
})

router.get('/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await service.findOne(id);
			res.json(product);
		} catch (err) {
			next(err);
		}
})

router.post('/',
	validatorHandler(createProductSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newProduct = await service.create(body);
			res.status(201).json({
				message: 'Created',
				data: newProduct
			})
		} catch(err) {
			next(err);
		}
});

router.put('/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const updatedProduct = await service.update(id, body);
			res.json({
				message: 'Updated',
				data: updatedProduct
			})
		} catch (error) {
			next(error);
		}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const operation = await service.delete(id);
	res.json(operation);
});

module.exports = router;
