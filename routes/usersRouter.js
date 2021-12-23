const express = require('express');
const UserService = require('../services/userService');
const router = express.Router();

const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');

const userService = new UserService();

router.post('/',
	validatorHandler(createUserSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await userService.create(body);
			res.status(201).json({
				message: 'Created',
				data: newUser
			})
		} catch(err) {
			next(err);
		}
	}
);

router.get('/:id',
	validatorHandler(getUserSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await userService.findOne(id);
			res.json(user)
		} catch (err) {
			next(err);
		}
});

router.put('/:id',
	validatorHandler(getUserSchema, 'params'),
	validatorHandler(updateUserSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const changes = req.body;
			const user = await userService.update(id, changes);
			res.json({
				message: 'Updated',
				data: user
			})
		} catch (err) {
			next(err);
		}
});

router.delete('/:id',
	validatorHandler(getUserSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await userService.delete(id);
			res.json({
				message: 'Deleted',
				user
			})
		} catch (error) {
			next(error);
		}
});

router.get('/users', async (req, res) => {
	const users = await userService.find();
	res.json(users);
});

module.exports = router;
